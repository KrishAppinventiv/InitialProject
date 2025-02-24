import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {InferProps, ReactElementLike, Requireable} from 'prop-types';
import {useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  Bubble,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images} from '../../assets';
import {vh} from '../../utils/dimension';
import {ScreenNames} from '../../utils/screenNames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {FullScreenImageModal} from '../../components/chatModal/fullScreenModal';
import ChatModalLongPress from '../../components/chatModal/chatModalLongPress';
import * as React from 'react';
import styles from './styles';
import Sound from 'react-native-sound';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import AudioMessage from '../../utils/audioMessage';


const audioRecorderPlayer = new AudioRecorderPlayer();

 const ChatScreen = () => {
  const navigation: any = useNavigation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioFilePath, setAudioFilePath] = useState('');
  const currentUser = auth().currentUser;
  const [typing, setTyping] = useState(false);
  const route = useRoute();
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const {roomId, selectedUser} = route.params || {};
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    const typingRef = firestore().collection('chats').doc(roomId);
    const unsubscribe = typingRef.onSnapshot(doc => {
      const typingData = doc.data()?.typing;
      setTyping(typingData?.[selectedUser.id] || false);
    });

    return () => unsubscribe();
  }, [roomId, selectedUser]);

  const getRealPath = async filePath => {
    const statResult = await RNFetchBlob.fs.stat(filePath);
    return statResult.path;
  };

  useEffect(() => {
    const messagesRef = firestore()
      .collection('chats')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc');

    const unsubscribe = messagesRef.onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const fetchedMessages = snapshot.docs.map(doc => {
          const data = doc.data();

          return {
            _id: doc.id,
            text: data.text || '',
            image: data.image || '',
            audio: data.audio || '',
            createdAt: data.timestamp ? data.timestamp.toDate() : new Date(),
            emojiReaction: data.emojiReaction || null,
            user: {
              _id: data.senderId,
              name: data.senderName || 'Unknown',
              avatar: data.senderAvatar || '',
            },
            read: data.read || false,
          };
        });

        setMessages(fetchedMessages.reverse());

        snapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.receiverId === currentUser?.uid && !data.read) {
            firestore()
              .runTransaction(async transaction => {
                transaction.update(doc.ref, {read: true});
              })
              .catch(error =>
                console.error('Error updating read status:', error),
              );
          }
        });
      }
    });

    return () => unsubscribe();
  }, [roomId, currentUser]);

  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleLongPress = (context, currentMessage) => {
    console.log('Long Pressed on:', currentMessage._id);
    setSelectedMessageId(currentMessage._id);
    setIsEmojiModalVisible(true);
  };
  const startRecording = async () => {
    try {
      const hasPermission = await requestAudioPermission();
      if (!hasPermission) {
        console.log('❌ Permission denied');
        return;
      }

      setIsRecording(true);

      const path =
        Platform.OS === 'android'
          ? `${RNFS.CachesDirectoryPath}/${Date.now()}.mp4`
          : `${RNFS.DocumentDirectoryPath}/audio.mp4`;

      console.log('🎤 Recording path:', path);

      const result = await audioRecorderPlayer.startRecorder(path);

      if (!result) {
        console.error('❌ Failed to start recorder!');
        return;
      }

      console.log('✅ Recording started:', result);
      setAudioFilePath(result);
    } catch (error) {
      console.error('❌ Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();

      if (!result || result.includes('Already stopped')) {
        console.error('❌ Recorder already stopped or invalid result:', result);
        return;
      }

      setIsRecording(false);

      const formattedPath = result.startsWith('file://')
        ? result
        : `file://${result}`;
      console.log('✅ Recording stopped:', formattedPath);

      setAudioFilePath(formattedPath);

      await uploadAudioToCloudinary(formattedPath);
    } catch (error) {
      console.error('❌ Error stopping recording:', error);
    }
  };
  const uploadAudioToCloudinary = async filePath => {
    try {
      const realPath = await getRealPath(filePath);
      const formattedPath = `file://${realPath}`;
      console.log('📂 Final File Path:', formattedPath);

      const formData = new FormData();
      formData.append('file', {
        uri: formattedPath,
        type: 'audio/mp4',
        name: 'voice_note.mp4',
      });
      formData.append('upload_preset', 'ChatAudio');

      console.log('🚀 Uploading audio to Cloudinary...');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dvzpe1ad0/video/upload',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const data = await response.json();
      if (data.secure_url) {
        console.log('✅ Cloudinary Upload Success:', data.secure_url);
        sendVoiceMessage(data.secure_url);
      } else {
        console.error('❌ Cloudinary Upload Failed:', data);
      }
    } catch (error) {
      console.error('❌ Cloudinary Upload Error:', error);
    }
  };

  const handleEmojiSelect = async (
    messageId: string,
    emoji: {
      emoji: any;
      id: string;
      source: any;
    },
  ) => {
    if (!messageId) return;
    console.log(emoji.emoji);
    try {
      const messageRef = firestore()
        .collection('chats')
        .doc(roomId)
        .collection('messages')
        .doc(messageId);

      await messageRef.update({emojiReaction: emoji.emoji});

      console.log(`Emoji ${emoji.emoji} added to message ${messageId}`);
    } catch (error) {
      console.error('Error adding emoji reaction:', error);
    }

    setIsEmojiModalVisible(false);
  };

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }

      const {_id, text} = newMessages[0];

      const newMessage = {
        _id,
        text,
        senderId: currentUser.uid,
        receiverId: selectedUser.id,
        timestamp: firestore.FieldValue.serverTimestamp(),
        read: false,
        user: {
          _id: currentUser.uid,
          name: currentUser.displayName || 'User',
          avatar: currentUser.photoURL || '',
        },
      };

      await firestore()
        .collection('chats')
        .doc(roomId)
        .collection('messages')
        .add(newMessage);

      await firestore().collection('chats').doc(roomId).update({
        lastMessage: text,
        lastMessageType: 'text',
        lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
      });
    },
    [roomId, selectedUser],
  );


  const playAudio = async (audioUrl: string, messageId: string) => {
    try {
      if (playingMessageId === messageId) {
        if (isAudioPlaying) {
          await audioRecorderPlayer.pausePlayer();
          setIsAudioPlaying(false);
        } else {
          await audioRecorderPlayer.resumePlayer();
          setIsAudioPlaying(true);
        }
        return;
      }
  
      if (playingMessageId) {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
      }
  
      // ✅ Update State Before Playing to Trigger UI Update
      setPlayingMessageId(messageId);
      setIsAudioPlaying(true);
      setAudioProgress(0);
  
      console.log("▶️ Playing Audio Message:", messageId);
  
      // ✅ Update Messages to Force Re-Render
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg._id === messageId ? { ...msg, isPlaying: true } : { ...msg, isPlaying: false }
        )
      );
  
      await audioRecorderPlayer.startPlayer(audioUrl);
  
      audioRecorderPlayer.addPlayBackListener(e => {
        setAudioProgress(e.currentPosition / e.duration);
  
        if (e.currentPosition >= e.duration) {
          console.log("🔁 Audio Finished");
          setIsAudioPlaying(false);
          setPlayingMessageId(null);
          setAudioProgress(0);
          audioRecorderPlayer.removePlayBackListener();
  
          // ✅ Update Messages to Stop Animation
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg._id === messageId ? { ...msg, isPlaying: false } : msg
            )
          );
        }
      });
    } catch (error) {
      console.error("❌ Audio playback error:", error);
      setIsAudioPlaying(false);
      setPlayingMessageId(null);
      setAudioProgress(0);
    }
  };
  
  
  
  
  
  

  const sendVoiceMessage = async audioUrl => {
    if (!audioUrl) return;

    const newMessage = {
      _id: Date.now().toString(),
      audio: audioUrl,
      senderId: currentUser?.uid,
      receiverId: selectedUser.id,
      timestamp: firestore.FieldValue.serverTimestamp(),
      read: false,
      senderName: currentUser?.displayName || 'User',
      senderAvatar: currentUser?.photoURL || '',
      user: {
        _id: currentUser?.uid,
        name: currentUser?.displayName || 'User',
        avatar: currentUser?.photoURL || '',
      },
    };

    const chatRef = firestore().collection('chats').doc(roomId);

    await chatRef.collection('messages').add(newMessage);

    await chatRef.update({
      lastMessage: '🎤 Voice Note',
      lastMessageType: 'audio',
      lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
    });
    console.log('✅ Voice message sent successfully!');
  };

  const uploadToCloudinary = async (imageUri: string) => {
    const formData = new FormData();

    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'chat_image.jpg',
    });

    formData.append('upload_preset', 'ChatImage');
    formData.append('cloud_name', 'dvzpe1ad0');

    try {
      console.log('🚀 Uploading image to Cloudinary...');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dvzpe1ad0/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();

      if (data.secure_url) {
        console.log('✅ Cloudinary Upload Success:', data.secure_url);
        return data.secure_url;
      } else {
        console.error('❌ Cloudinary Upload Failed:', data);
        return null;
      }
    } catch (error) {
      console.error('❌ Cloudinary Upload Error:', error);
      return null;
    }
  };

  const pickImage = async () => {
    try {
      console.log('📷 Opening Image Picker...');
      const result = await launchImageLibrary({mediaType: 'photo'});

      if (!result.assets || !result.assets[0]?.uri) {
        console.error('❌ No image selected!');
        return;
      }

      const imageUri = result.assets[0].uri;

      const cloudinaryUrl = await uploadToCloudinary(imageUri);
      if (cloudinaryUrl) {
        const currentUser = auth().currentUser;
        if (!currentUser) {
          console.error('❌ User not authenticated!');
          return;
        }

        sendImageMessage(cloudinaryUrl, currentUser);
      } else {
        console.error('❌ Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('❌ Image Picker Error:', error);
    }
  };

  const sendImageMessage = async (
    imageUri: string,
    currentUser:
      | {uid: string; displayName: string; photoURL: string}
      | undefined,
  ) => {
    if (!currentUser) return;

    const newMessage = {
      _id: Date.now().toString(),
      image: imageUri,
      senderId: currentUser.uid,
      receiverId: selectedUser.id,
      timestamp: firestore.FieldValue.serverTimestamp(),
      read: false,
      senderName: currentUser.displayName || 'User',
      senderAvatar: currentUser.photoURL || '',
      user: {
        _id: currentUser.uid,
        name: currentUser.displayName || 'User',
        avatar: currentUser.photoURL || '',
      },
    };

    await firestore()
      .collection('chats')
      .doc(roomId)
      .collection('messages')
      .add(newMessage);

    await firestore().collection('chats').doc(roomId).update({
      lastMessage: '📷 Image',
      lastMessageType: 'image',
      lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
    });
  };
  const renderInputToolbar = (
    props: React.JSX.IntrinsicAttributes &
      Pick<InputToolbarProps<IMessage>, keyof InputToolbarProps<IMessage>> &
      Pick<
        InferProps<{
          renderAccessory: Requireable<(...args: any[]) => any>;
          renderActions: Requireable<(...args: any[]) => any>;
          renderSend: Requireable<(...args: any[]) => any>;
          renderComposer: Requireable<(...args: any[]) => any>;
          onPressActionButton: Requireable<(...args: any[]) => any>;
          containerStyle: Requireable<
            NonNullable<number | boolean | object | null | undefined>
          >;
          primaryStyle: Requireable<
            NonNullable<number | boolean | object | null | undefined>
          >;
          accessoryStyle: Requireable<
            NonNullable<number | boolean | object | null | undefined>
          >;
        }>,
        never
      > &
      Pick<
        InputToolbarProps<IMessage>,
        'options' | 'optionTintColor' | 'icon' | 'wrapperStyle'
      >,
  ) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#222',
          borderTopWidth: 0,
          paddingHorizontal: vh(5),
          paddingVertical: 5,
          borderRadius: 25,
        }}
        primaryStyle={{alignItems: 'center'}}
      />
    );
  };

  const handleTyping = (text: string) => {
    if (!currentUser || !currentUser.uid) return;

    const typingRef = firestore().collection('chats').doc(roomId);

    typingRef.update({
      [`typing.${currentUser.uid}`]: text.length > 1,
    });
  };

  const renderBubble = props => {
    const {currentMessage, previousMessage} = props;

    const isCurrentUser = currentMessage.user._id === currentUser?.uid;
    const isSameSenderAsPrevious =
      previousMessage?.user?._id === currentMessage.user._id;
    return (
      <View
        style={{
          position: 'relative',
          marginBottom: isSameSenderAsPrevious ? 10 : 20,
        }}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {backgroundColor: '#0078fe'},
            left: {backgroundColor: '#f0f0f0'},
          }}
        />

        {currentMessage.emojiReaction ? (
          <View
            style={{
              position: 'absolute',
              bottom: -10,
              [isCurrentUser ? 'right' : 'left']: 0,

              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 14}}>
              {typeof currentMessage.emojiReaction === 'object'
                ? currentMessage.emojiReaction.emoji
                : currentMessage.emojiReaction}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  useEffect(() => {
    console.log("🔄 Re-render triggered! Playing message:", playingMessageId);
  }, [playingMessageId, isAudioPlaying, audioProgress]);
  
  const renderMessageAudio = (props: any) => {
    const { currentMessage } = props;
    const isCurrentUser = currentMessage.user._id === auth().currentUser?.uid;
  
    return (
      <AudioMessage
        message={currentMessage}
        isCurrentUser={isCurrentUser}
        playAudio={playAudio}
        isAudioPlaying={currentMessage.isPlaying || false} // ✅ Track message state
        audioProgress={audioProgress}
      />
    );
  };
  
  
  
  
  
  

  const renderComposer = (
    props: React.JSX.IntrinsicAttributes &
      Pick<ComposerProps, keyof ComposerProps> &
      Pick<
        InferProps<{
          composerHeight: Requireable<number>;
          text: Requireable<string>;
          placeholder: Requireable<string>;
          placeholderTextColor: Requireable<string>;
          textInputProps: Requireable<object>;
          onTextChanged: Requireable<(...args: any[]) => any>;
          onInputSizeChanged: Requireable<(...args: any[]) => any>;
          multiline: Requireable<boolean>;
          disableComposer: Requireable<boolean>;
          textInputStyle: Requireable<
            NonNullable<number | boolean | object | null | undefined>
          >;
          textInputAutoFocus: Requireable<boolean>;
          keyboardAppearance: Requireable<string>;
        }>,
        never
      > &
      Pick<ComposerProps, never>,
  ) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#333',
          borderRadius: vh(20),
          paddingHorizontal: vh(10),
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}>
          <MaterialIcons
            name={isRecording ? 'stop' : 'keyboard-voice'}
            size={24}
            color={isRecording ? 'red' : 'white'}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <Composer
          {...props}
          textInputStyle={{color: 'white'}}
          onTextChanged={text => {
            handleTyping(text);
            props.onTextChanged?.(text);
          }}
        />
        <TouchableOpacity>
          <FontAwesome
            name="smile-o"
            size={24}
            color="white"
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSend = (
    props: React.JSX.IntrinsicAttributes &
      Pick<SendProps<IMessage>, keyof SendProps<IMessage>> &
      Pick<
        InferProps<{
          x;
          text: Requireable<string>;
          onSend: Requireable<(...args: any[]) => any>;
          label: Requireable<string>;
          containerStyle: Requireable<
            NonNullable<number | boolean | object | null | undefined>
          >;
          textStyle: Requireable<
            NonNullable<number | boolean | object | null | undefined>
          >;
          children: Requireable<ReactElementLike>;
          alwaysShowSend: Requireable<boolean>;
          disabled: Requireable<boolean>;
          sendButtonProps: Requireable<object>;
        }>,
        never
      > &
      Pick<SendProps<IMessage>, never>,
  ) => {
    return (
      <Send {...props}>
        <View style={{marginRight: 10, marginBottom: 5}}>
          <Ionicons name="send" size={24} color="white" />
        </View>
      </Send>
    );
  };

  // Custom Actions (Attach Button)
  const renderActions = () => {
    return (
      <TouchableOpacity style={{marginLeft: 10}} onPress={() => pickImage()}>
        <Ionicons name="attach" size={24} color="white" />
      </TouchableOpacity>
    );
  };
  const renderFooter = () => {
    if (typing) {
      return (
        <View style={{padding: 5}}>
          <Text style={{color: 'gray', marginLeft: 10}}>
            {selectedUser.name} is typing...
          </Text>
        </View>
      );
    }
    return null;
  };
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await firestore()
        .collection('chats')
        .doc(roomId)
        .collection('messages')
        .doc(messageId)
        .delete();

      setMessages(prevMessages =>
        prevMessages.filter(msg => msg._id !== messageId),
      );

      setIsEmojiModalVisible(false);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  const renderMessageImage = (props: any) => {
    const {currentMessage} = props;

    if (!currentMessage?.image) return null;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('Setting Modal Image URL:', currentMessage.image);
          setModalImageUrl(currentMessage.image);
          setIsImageModalVisible(true);
        }}>
        <Image
          source={{uri: currentMessage.image}}
          style={{width: 200, height: 200, borderRadius: 10}}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    return () => {
      if (playingMessageId) {
        console.log('🧹 Cleaning up audio player');
        audioRecorderPlayer.stopPlayer().catch(console.error);
        audioRecorderPlayer.removePlayBackListener();
        setIsAudioPlaying(false);
        setPlayingMessageId(null);
        setAudioProgress(0);
      }
    };
  }, [playingMessageId]);

  return (
    <View style={styles.container}>
      <FullScreenImageModal
        visible={isImageModalVisible}
        imageUrl={modalImageUrl}
        onClose={() => setIsImageModalVisible(false)}
      />
      <View style={styles.mainContain}>
        <View style={styles.blackContain}>
          <View style={styles.flexrow}>
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNames.UserChat)}>
              <Image source={Images.backarrow} style={styles.arrowImg} />
            </TouchableOpacity>

            <View
              style={[
                styles.profContain,
                {backgroundColor: selectedUser.color},
              ]}>
              <Text style={styles.profIcon}>{selectedUser.profileImg}</Text>
            </View>

            <View style={styles.userContain}>
              <Text style={styles.username}>{selectedUser.name}</Text>
              <Text style={styles.clockText}>Clocked In</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => null}>
            <Image source={Images.menu} style={styles.options} />
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser?.uid || 'unknown_user',
          name: currentUser?.displayName || 'User',
        }}
        onLongPress={(context, message) => handleLongPress(context, message)}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderActions={renderActions}
        renderFooter={renderFooter}
        renderMessageImage={renderMessageImage}
        renderBubble={renderBubble}
        renderMessageAudio={renderMessageAudio}
      />
      <ChatModalLongPress
        visible={isEmojiModalVisible}
        ondismiss={() => setIsEmojiModalVisible(false)}
        onEmojiSelect={handleEmojiSelect}
        selectedMessageId={selectedMessageId}
        onDelete={() => handleDeleteMessage(selectedMessageId)}
      />
    </View>
  );
};

export default ChatScreen;
