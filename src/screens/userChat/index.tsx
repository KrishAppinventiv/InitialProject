import {
  SafeAreaView,
  TextInput,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenNames} from '../../utils/screenNames';
import {RootStackParamList} from '../../utils/types';
import {Images} from '../../assets';
import styles from './styles';
import {getAuth} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import CustomModal from '../../components/CustomModal';
import Button from '../../components/Button';
type CustomContact = {
  id: string;
  name: string;
  phoneNumber?: string;
  profileImg: string;
  color?: string;
  lastMessage: string;
  lastMessageTimestamp: number;
  lastMessageType: string;
  isGroup: boolean;
};

const UserChat = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const searchInputRef = useRef<TextInput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatUsers, setChatUsers] = useState<CustomContact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const currentUserId = auth().currentUser?.uid;
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<CustomContact | null>(null);
  console.log('Checking', chatUsers);

  useEffect(() => {
    if (!currentUserId) return;
    console.log('Current User ID:', currentUserId);
    const unsubscribeChats = firestore()
      .collection('chats')
      .where('participants', 'array-contains', currentUserId)
      .orderBy('timestamp', 'desc')
      .onSnapshot(async snapshot => {
        const chatData: ChatDocument[] = snapshot.docs.map(doc => ({
          ...(doc.data() as ChatDocument),
          id: doc.id,
        }));

        const userIds = chatData
          .map(chat => chat.participants.find(id => id !== currentUserId))
          .filter((id): id is string => !!id);

        let users: CustomContact[] = [];

        if (userIds.length > 0) {
          const usersSnapshot = await firestore()
            .collection('users')
            .where('uid', 'in', userIds)
            .get();

          users = usersSnapshot.docs.map(doc => {
            const userData = doc.data();
            const chat = chatData.find(chat =>
              chat.participants.includes(doc.id),
            );

            const timestamp = chat?.timestamp?.toMillis?.() || 0;

            return {
              id: doc.id,
              name: userData.name || 'Unknown',
              phoneNumber: userData.phoneNumber || '',
              profileImg: userData.profileImg || '',
              color: userData.color || '#4682B4',
              lastMessage: chat?.lastMessage || 'No messages yet',
              lastMessageType: chat?.lastMessage?.type || 'text',
              lastMessageTimestamp: timestamp,
              isGroup: false,
            };
          });
        }

        const groupSnapshot = await firestore()
          .collection('groupChats')
          .where('members', 'array-contains', currentUserId)
          .get();
        console.log('DATA ENTRY', groupSnapshot);
        const groups = groupSnapshot.docs.map(doc => {
          const groupData = doc.data();
          
          const timestamp = groupData.lastMessageTimestamp?.toMillis?.() || 0;

          return {
            id: doc.id,
            name: groupData.groupName || 'Unnamed Group',
            profileImg: 'GR',
            color: groupData.color || '#483D8B',
            lastMessage: groupData.lastMessage || 'No messages yet',
            lastMessageType: 'text',
            lastMessageTimestamp: timestamp,
            isGroup: true,
          };
        });
        

        const sortedChatUsers = [...users, ...groups].sort((a, b) => {
          return (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0);
        });
        setChatUsers(sortedChatUsers);
        
        
      });

    return () => unsubscribeChats();
  }, [currentUserId]);

  const handleChatOpen = async (chat: CustomContact) => {
    if (!currentUserId) return;

    if (chat.isGroup) {
      navigation.navigate(ScreenNames.GroupChatting, {
        groupId: chat.id,
        groupName: chat.name,
      });
    } else {
      // **Handle One-on-One Chat**
      const roomId = [currentUserId, chat.id].sort().join('_');
      const chatRef = firestore().collection('chats').doc(roomId);
      const chatSnapshot = await chatRef.get();

      if (!chatSnapshot.exists) {
        await chatRef.set({
          participants: [currentUserId, chat.id],
          lastMessage: '',
          lastMessageType: 'text',
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      }

      navigation.navigate(ScreenNames.Chat, {roomId, selectedUser: chat});
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedChat || !currentUserId) return;

    try {
      if (selectedChat.isGroup) {
        // Delete group chat
        await firestore()
          .collection('groupChats')
          .doc(selectedChat.id)
          .delete();
      } else {
        // Delete individual chat
        const roomId = [currentUserId, selectedChat.id].sort().join('_');
        await firestore().collection('chats').doc(roomId).delete();
      }
      setDeleteModalVisible(false);
      setSelectedChat(null);
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.BottomTab)}>
          <Image source={Images.backarrow} style={styles.arrowImg} />
        </TouchableOpacity>
        <View style={styles.searchContain}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search here.."
            placeholderTextColor="#A9A9A9"
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Ionicons name="add-circle-outline" size={26} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chatUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleChatOpen(item)}
            onLongPress={() => {
              setSelectedChat(item);
              setDeleteModalVisible(true);
            }}
            activeOpacity={0.7}
            style={styles.chatContainer}>
            <View
              style={[styles.avatarContainer, {backgroundColor: item.color}]}>
              <Text style={styles.circleText}>{item.profileImg}</Text>
            </View>

            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.lastMessage}>
                {item.lastMessageType === 'image'
                  ? '📷 Image'
                  : item.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {searchQuery && chatUsers.length === 0 && (
        <Text style={styles.noresult}>No Result Found</Text>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.introContainers}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate(ScreenNames.Search);
              }}>
              <View style={styles.Contain}>
                <Image source={Images.chat} />
                <Text style={styles.modalText}>New Chat</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate(ScreenNames.GroupChat);
              }}>
              <View style={styles.Contain}>
                <Image source={Images.group} />
                <Text style={styles.modalText}>New Group Chat</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <View style={styles.Contain}>
                <Image source={Images.announce} />
                <Text style={styles.modalText}>New Announcement</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <CustomModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to delete{' '}
            {selectedChat?.isGroup ? 'Group' : ''} Chat with{' '}
            {selectedChat?.name}?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              text="Delete"
              onPress={handleDeleteChat}
              style={styles.okButton}
              disabled={false}
            />
            <Button
              text="Cancel"
              onPress={() => {
                setDeleteModalVisible(false);
                setSelectedChat(null);
              }}
              style={styles.cancelButton}
              disabled={false}
            />
          </View>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
};

export default UserChat;
