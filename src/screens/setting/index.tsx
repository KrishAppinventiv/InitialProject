// Library Imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, I18nManager, Switch, Text, View } from 'react-native';

// Custom Imports
import Button from '../../components/Button';
import CustomModal from '../../components/CustomModal';

// Utility Imports
import { FontSizeContext } from '../../utils/FontSizeContext';
import i18n from '../../utils/i18n';
import { ScreenNames } from '../../utils/screenNames';
import { ThemeContext } from '../../utils/theme-context';
import { RootStackParamList } from '../../utils/types';
import { handleLogout, selectLanguage } from '../../utils/commonfunction';

// Style Imports
import styles from './styles';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Setting
>;
const Setting = () => {
  const {t} = useTranslation();
  const {fontSize, setFontSize, fontSizes} = useContext(FontSizeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const {isDarkMode, toggleTheme, setTheme} = useContext(ThemeContext);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language,
  );
  const navigation = useNavigation<SignupScreenNavigationProp>();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('selectedLanguage');
      if (savedLang) {
        setSelectedLanguage(savedLang);
        i18n.changeLanguage(savedLang);
      }
    };
    loadLanguage();
  }, []);


  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.settingItem}>
        <Text style={[styles.label, {fontSize: fontSizes.title}]}>
          {t('screens.settings.language')}
        </Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={itemValue => {
            selectLanguage(itemValue)
            setSelectedLanguage(itemValue);
          }}
          style={styles.picker}>
          <Picker.Item
            label={t('screens.settings.languageOptions.english')}
            value="en"
          />
          <Picker.Item
            label={t('screens.settings.languageOptions.german')}
            value="de"
          />
          <Picker.Item
            label={t('screens.settings.languageOptions.french')}
            value="fr"
          />
          <Picker.Item
            label={t('screens.settings.languageOptions.hindi')}
            value="hi"
          />
          <Picker.Item
            label={t('screens.settings.languageOptions.japanese')}
            value="ja"
          />
          <Picker.Item
            label={t('screens.settings.languageOptions.urdu')}
            value="ur"
          />
        </Picker>
      </View>
      <View style={styles.settingItem}>
        <Text style={[styles.label, {fontSize: fontSizes.title}]}>
          {t('screens.settings.fontSize')}
        </Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          value={fontSize}
          onValueChange={value => setFontSize(Math.round(value))}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={[styles.label, {fontSize: fontSizes.title}]}>
          {t('screens.settings.darkMode')}
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <Button
        text={t('screens.settings.deleteAccount')}
        onPress={() => Alert.alert('Account Deleted')}
        style={styles.button}
        disabled={false}
      />
      <Button
        text={t('screens.settings.logOut')}
        onPress={() => {
          setModalVisible(true)
         
        }}
        style={styles.button}
        disabled={false}
      />

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}> 
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to logout?</Text>
          <View style={styles.modalButtons}>
            <Button
              text="OK"
              onPress={()=>{
                setModalVisible(false);
                handleLogout();
                setTimeout(() => {
                  setTheme('light');
                }, 300);
                navigation.reset({
                  index: 0,
                  routes: [{name: ScreenNames.Signin}],
                });
              }}
              style={styles.okButton}
              disabled={false}
            />
            <Button
              text="Cancel"
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
              disabled={false}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default Setting;
