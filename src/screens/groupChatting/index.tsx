import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {InferProps, ReactElementLike, Requireable} from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Images} from '../../assets';
import {vh} from '../../utils/dimension';
import {ScreenNames} from '../../utils/screenNames';

import {launchImageLibrary} from 'react-native-image-picker';
import {FullScreenImageModal} from '../../components/chatModal/fullScreenModal';
import ChatModalLongPress from '../../components/chatModal/chatModalLongPress';
import styles from './styles';

const GroupChatting = () => {
  const navigation: any = useNavigation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const currentUser = auth().currentUser;
  const [typingUsers, setTypingUsers] = useState({});
  const route = useRoute();
  const {groupId, groupName} = route.params;
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [groupDetails, setGroupDetails] = useState<any>(null);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);

  useEffect(() => {
    const groupRef = firestore().collection('groupChats').doc(groupId);

    const unsubscribe = groupRef.onSnapshot(doc => {
      setGroupDetails(doc.data());
    });

    return () => unsubscribe();
  }, [groupId]);

 
  useEffect(() => {
    const messagesRef = firestore()
      .collection('groupChats')
      .doc(groupId)
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
            createdAt: data.timestamp ? data.timestamp.toDate() : new Date(),
            emojiReaction: data.emojiReaction || null,
            user: {
              _id: data.senderId,
              name: data.senderName || 'Unknown',
              avatar: data.senderAvatar || '',
            },
            readBy: data.readBy || [],
          };
        });

        const systemMsg = fetchedMessages.find(msg => msg.user._id === 'system');
      setSystemMessage(systemMsg ? systemMsg.text : null);

     
      setMessages(fetchedMessages.filter(msg => msg.user._id !== 'system').reverse());

        
        const batch = firestore().batch();
        snapshot.docs.forEach(doc => {
          const messageRef = firestore()
            .collection('groupChats')
            .doc(groupId)
            .collection('messages')
            .doc(doc.id);
          batch.update(messageRef, {
            readBy: firestore.FieldValue.arrayUnion(currentUser?.uid),
          });
        });
        batch.commit().catch(error => console.error('Error updating read status:', error));
        
      }
    });

    return () => unsubscribe();
  }, [groupId, currentUser]);

  useEffect(() => {
    const typingRef = firestore().collection('groupChats').doc(groupId);


    const unsubscribe = typingRef.onSnapshot(doc => {
      setTypingUsers(doc.data()?.typing || {});
    });

    return () => unsubscribe();
  }, [groupId]);

  const handleLongPress = (context, currentMessage) => {
    console.log('Long Pressed on:', currentMessage._id);
    setSelectedMessageId(currentMessage._id);
    setIsEmojiModalVisible(true);
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
        .collection('groupChats')
        .doc(groupId)
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
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }

      const {_id, text} = newMessages[0];

      const newMessage = {
        _id,
        text,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || 'User',
        senderAvatar: currentUser.photoURL || '',
        timestamp: firestore.FieldValue.serverTimestamp(),
        readBy: [currentUser.uid],
      };

      const groupRef = firestore().collection('groupChats').doc(groupId);

      await groupRef.collection('messages').add(newMessage);

      await groupRef.update({
        lastMessage: text,
        lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
      });
    },
    [groupId],
  );

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
  console.log("CLOUDINARY", cloudinaryUrl)
  console.log("Calling sendImageMessage with:", cloudinaryUrl, currentUser);
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
    .collection('groupChats')
    .doc(groupId)
    .collection('messages')
    .add(newMessage)
    .then(() => console.log("✅ Image message stored in Firestore"))
    .catch(error => console.error("❌ Firestore Error:", error));
    await firestore().collection('groupChats').doc(groupId).update({
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

    const typingRef = firestore().collection('chats').doc(groupId);

    typingRef.update({
      [`typing.${currentUser.uid}`]: text.length >= 1,
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
        <TouchableOpacity>
          <MaterialIcons
            name="keyboard-voice"
            size={24}
            color="white"
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
    const typingUsersArray = Object.entries(typingUsers)
      .filter(([uid, isTyping]) => isTyping && uid !== currentUser?.uid)
      .map(
        ([uid]) =>
          groupDetails?.members.find((user: any) => user.id === uid)?.name ||
          'Someone',
      );

    if (typingUsersArray.length > 0) {
      return (
        <View style={{padding: 5}}>
          <Text style={{color: 'gray', marginLeft: 10}}>
            {typingUsersArray.join(', ')} is typing...
          </Text>
        </View>
      );
    }

    return null;
  };
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await firestore()
      .collection('groupChats')
      .doc(groupId)
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
                // {backgroundColor: selectedUser.color},
              ]}>
              <Text style={styles.profIcon}>KK</Text>
            </View>

            <View style={styles.userContain}>
              <Text style={styles.username}>{groupName}</Text>
              <Text style={styles.clockText}>Clocked In</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => null}>
            <Image source={Images.menu} style={styles.options} />
          </TouchableOpacity>
        </View>
      </View>
      {systemMessage && (
    <View style={{ padding: 10, backgroundColor: '#fff', marginVertical: 10, borderRadius: vh(30) ,marginHorizontal:vh(50)}}>
      <Text style={{ color: 	'#87CEFA', textAlign: 'center' }}>{systemMessage}</Text>
    </View>
  )}
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
      />

      <ChatModalLongPress
        visible={isEmojiModalVisible}
        ondismiss={() => setIsEmojiModalVisible(false)}
        onEmojiSelect={handleEmojiSelect}
        selectedMessageId={selectedMessageId} // Pass selected messageId
        onDelete={() => handleDeleteMessage(selectedMessageId)}
      />
    </View>
  );
};

export default GroupChatting;
