import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomContact, RootStackParamList} from '../../utils/types';
import {ScreenNames} from '../../utils/screenNames';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {Images} from '../../assets';
const GroupChat = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [registeredUsers, setRegisteredUsers] = useState<CustomContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [existingChatUsers, setExistingChatUsers] = useState<string[]>([]);
  const currentUserId = auth().currentUser?.uid;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribeUsers = firestore()
      .collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const fetchedUsers = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(user => user.id !== currentUserId);

        setRegisteredUsers(fetchedUsers);
      });
    console.log('filteredUser', registeredUsers[0]);

    const unsubscribeChats = firestore()
      .collection('chats')
      .where('participants', 'array-contains', currentUserId)
      .onSnapshot(snapshot => {
        const chatUsers = snapshot.docs.flatMap(doc => doc.data().participants);
        setExistingChatUsers(chatUsers.filter(id => id !== currentUserId));
      });

    return () => {
      unsubscribeUsers();
      unsubscribeChats();
    };
  }, [currentUserId]);

  const filteredUsers = registeredUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  
  const createGroupChat = async (groupName: string, participants: string[]) => {
    try {
        const newRoomRef = firestore().collection('groupChats').doc(); 
        
        const groupChatData = {
            roomId: newRoomRef.id,
            groupName,
            members: participants, 
            createdAt: firestore.FieldValue.serverTimestamp(),
            lastMessage: '',
            lastMessageType: '',
            lastMessageTimestamp: null,
            typing: participants.reduce((acc, userId) => ({ ...acc, [userId]: false }), {}),
        };

        await newRoomRef.set(groupChatData);

        
        await newRoomRef.collection('messages').add({
            _id: newRoomRef.id, 
            text: `${groupName} group chat created.`,
            senderId: 'system', 
            timestamp: firestore.FieldValue.serverTimestamp(),
            readBy: [], 
        });

        return newRoomRef.id;
    } catch (error) {
        console.error('Error creating group chat:', error);
        throw error;
    }
};

const handleCreateGroup = async () => {
  if (!groupName.trim() || selectedUsers.length < 1 || !currentUserId) return; 

  const groupMembers: string[] = [currentUserId, ...selectedUsers].filter(Boolean) as string[]; 
  console.log("GroupMembers",groupMembers)
  const groupId = await createGroupChat(groupName, groupMembers);
  console.log("GroupId", groupId);

  setIsModalVisible(false);
  setGroupName('');

  navigation.navigate(ScreenNames.GroupChatting, { groupId, groupName });
};

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.backarrow} style={styles.arrowImg} />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#A9A9A9"
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        removeClippedSubviews={false}
        renderItem={({item}) => {
          const isSelected = selectedUsers.includes(item.id);

          return (
            <TouchableOpacity
              onLongPress={() => handleSelectUser(item.id)}
              activeOpacity={0.7}
              style={[styles.chatContainer, isSelected && styles.selectedUser]} // Change Background
            >
              <View style={styles.avatarContainer}>
                <Text style={styles.circleText}>{item.profileImg}</Text>
              </View>

              <View style={styles.chatDetails}>
                <Text style={styles.chatName}>{item.name}</Text>
              </View>

              {isSelected && (
                <Image source={Images.checkbox} style={styles.checkboxIcon} />
              )}
            </TouchableOpacity>
          );
        }}
      />

      {filteredUsers.length === 0 && (
        <Text style={styles.noresult}>No Result Found</Text>
      )}
      {selectedUsers.length > 1 && (
        <TouchableOpacity
          style={styles.createGroupBtn}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.createGroupText}>Create Group</Text>
        </TouchableOpacity>
      )}

<Modal
  visible={isModalVisible}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Create a Group</Text>

      <TextInput
        style={styles.modalInput}
        placeholder="Enter group name"
        placeholderTextColor="#aaa"
        value={groupName}
        onChangeText={setGroupName}
      />

      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateGroup} style={styles.createButton}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

export default GroupChat;
