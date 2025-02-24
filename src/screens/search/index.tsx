import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ScreenNames } from '../../utils/screenNames';
import { Images } from '../../assets';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomContact, RootStackParamList } from '../../utils/types';

interface User {
  id: string;
  name: string;
  phoneNumber: number,
  profileImg: string;
  color: string;
}

const Search = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [registeredUsers, setRegisteredUsers] = useState<CustomContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [existingChatUsers, setExistingChatUsers] = useState<string[]>([]);
  const currentUserId = auth().currentUser?.uid; 

  useEffect(() => {
    if (!currentUserId) return;

    // Fetch all registered users
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
      console.log("filteredUser", registeredUsers[0])
   
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

  

  
  const newUsers = registeredUsers.filter(user => !existingChatUsers.includes(user.id));

  const filteredUsers = newUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

 

  const handleSelectUser = async (selectedUser: CustomContact) => {
    if (!currentUserId) return;

    const selectedUserId = selectedUser.id;
    const roomId =
      currentUserId < selectedUserId
        ? `${currentUserId}_${selectedUserId}`
        : `${selectedUserId}_${currentUserId}`;

    const chatRef = firestore().collection('chats').doc(roomId);
    const chatSnapshot = await chatRef.get();

    if (!chatSnapshot.exists) {
      await chatRef.set({
        participants: [currentUserId, selectedUserId],
        lastMessage: '',
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    }

    navigation.navigate(ScreenNames.Chat, { roomId, selectedUser });
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
        renderItem={({ item }) => ( 
          <TouchableOpacity
      onPress={() => handleSelectUser(item)}
      activeOpacity={0.7}
      style={styles.chatContainer}
    >
      <View style={[styles.avatarContainer]}>
      <Text style={styles.circleText}>{item.profileImg}</Text>
      </View>

      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
       
      </View>

    
    </TouchableOpacity>
          
        )}
      />

      {filteredUsers.length === 0 && <Text style={styles.noresult}>No Result Found</Text>}
    </SafeAreaView>
  );
};

export default Search;
