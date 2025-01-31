// Library Imports
import React, {useContext, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

// Asset Imports
import {Images} from '../../assets';

// Utility Imports
import {colors} from '../../theme';
import {notifyData} from '../../utils/constant';
import {ThemeContext} from '../../utils/theme-context';

// Style Imports
import CustomFlatList from '../../components/CustomFlatList';
import styles from './styles';

type Notification = {
  head: string;
  description: string;
  time: number;
  status: 'read' | 'unread';
};

type RenderItemProps = {
  item: Notification;
};

const Notification = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const {isDarkMode, toggleTheme} = useContext(ThemeContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotification =
        notifyData[Math.floor(Math.random() * notifyData.length)];
      setNotifications(prevNotifications => [
        ...prevNotifications,
        randomNotification,
      ]);
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
    ? notifications.filter(item => {
        if (selectedTab === 0) return true;
        if (selectedTab === 1 && item.status === 'read') return true;
        if (selectedTab === 2 && item.status === 'unread') return true;
        return false;
      })
    : [];

  const renderTabItem = ({item, index}: {item: string; index: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.typeItem}
        onPress={() => setSelectedTab(index)}>
        <View
          style={[
            styles.category,
            {
              backgroundColor:
                selectedTab === index ? colors.main : colors.white,
            },
          ]}>
          <Text
            style={[
              styles.item,
              {
                color: selectedTab === index ? 'white' : colors.lightestGreen,
                fontSize: selectedTab === index ? 14 : 16,
              },
            ]}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: RenderItemProps) => (
    <View style={styles.card}>
      <View style={styles.renderView}>
        <Text style={styles.head}>{item.head}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.time}>{item.time} mins ago</Text>
      </View>
      <View style={styles.source}>
        <Image source={Images.docnotify} />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View>
        <View style={styles.headed}>
          <Text
            style={[styles.heading, {color: isDarkMode ? colors.white : colors.black}]}>
            Notifications
          </Text>
        </View>

        <CustomFlatList
          data={['All', 'Read', 'Unread']}
          renderItem={renderTabItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.date}>
        <Text
          style={[styles.dateText, {color: isDarkMode ? colors.white : colors.black}]}>
          {todayDate}
        </Text>
      </View>

      <CustomFlatList
        data={filteredNotifications}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Notification;
