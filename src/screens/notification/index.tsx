import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';


import styles from './styles';
import { ThemeContext } from '../../utils/theme-context';

type Notification = {
  head: string;
  description: string;
  time: number;
  status: 'read' | 'unread';
};


const Notification = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  const notifyData: Notification[] = [
    {
      head: 'Order Confirmed!',
      description: 'Your order #123456 has been successfully placed and is being processed.',
      time: 5,
      status: 'unread'
    },
    {
      head: 'Shipped!',
      description: 'Your order #123456 has been shipped. Track your shipment for real-time updates.',
      time: 15,
      status: 'unread'
    },
    {
      head: 'Out for Delivery!',
      description: 'Your package #123456 is out for delivery. Expect it to arrive today.',
      time: 30,
      status: 'read'
    },
    {
      head: 'Delivered!',
      description: 'Your package #123456 has been delivered. We hope you enjoy your purchase!',
      time: 120,
      status: 'read'
    },
    {
      head: 'Delivery Delayed',
      description: 'Your package #123456 is delayed due to weather conditions. We’ll update you soon.',
      time: 60,
      status: 'read'
    },
    {
      head: 'Pickup Reminder',
      description: 'Your package #123456 is ready for pickup at the nearest service center.',
      time: 10,
      status: 'unread'
    },
    {
      head: 'Track Your Shipment',
      description: 'Easily track your order #123456 from the “My Orders” section in the app.',
      time: 20,
      status: 'read'
    },
    {
      head: 'Special Offer!',
      description: 'Get free shipping on your next order. Use code FREESHIP at checkout!',
      time: 45,
      status: 'unread'
    },
    {
      head: 'Address Confirmation',
      description: 'Please confirm your delivery address for order #123456 to avoid delays.',
      time: 25,
      status: 'unread'
    },
    {
      head: 'Shipment Update',
      description: 'Your package #123456 has been sorted at the distribution center and is on its way.',
      time: 35,
      status: 'read'
    },
  ];
  


useEffect(() => {
  const interval = setInterval(() => {
    const randomNotification = notifyData[Math.floor(Math.random() * notifyData.length)];
    setNotifications((prevNotifications) => [...prevNotifications, randomNotification]);
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const today = new Date();
  const todayDate = today.toLocaleDateString();
 
  let NotificationDate = '21/11/2024';
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayDate = yesterday.toLocaleDateString();

  let displayDate;
  if (NotificationDate === todayDate) {
    displayDate = 'Today';
  } else if (NotificationDate === yesterdayDate) {
    displayDate = 'Yesterday';
  } else {
    displayDate = NotificationDate;
  }


  const filteredNotifications = Array.isArray(notifications)
  ? notifications.filter((item) => {
      if (selectedTab === 0) return true;
      if (selectedTab === 1 && item.status === 'read') return true;
      if (selectedTab === 2 && item.status === 'unread') return true;
      return false;
    })
  : [];


  const renderItem = ({item}:any) => (<View style={styles.card}>

  
  <View style={styles.renderView}>
   <Text style={styles.head}>{item.head}</Text>
   <Text style={styles.desc}>{item.description}</Text>
   <Text style={styles.time}>{item.time} mins ago</Text>
  </View>
  <View style={styles.source}>
  <Image source={Images.docnotify}/>
  </View>

  </View>);





  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View >
        <View style={styles.headed}>
          <Text style={[styles.heading,{color:isDarkMode?"#ffffff":'#000'}]}>Notifications</Text>
        </View>

        <FlatList
          data={['All', 'Read', 'Unread']}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.typeItem}
                onPress={() => {
                  setSelectedTab(index);
                }}>
                <View
                  style={[
                    styles.category,
                    {
                      backgroundColor:
                        selectedTab == index ? colors.main : colors.white,
                    },
                  ]}>
                  <Text
                    style={[styles.item, {color: selectedTab == index ? 'white' : '#71B1A1',fontSize:selectedTab == index ? 14 : 16,}]}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={styles.date}>
        <Text style={[styles.dateText,{color:isDarkMode?"#ffffff":'#000'}]}>{todayDate}</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Notification;


