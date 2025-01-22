import Slider from '@react-native-community/slider';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, I18nManager, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { colors } from '../../theme';
import { vh } from '../../theme/dimensions';
import Button from '../../components/Button';
import { ThemeContext } from '../../utils/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  i18n, { changeLanguage } from '../../utils/i18n';
import { ScreenNames } from '../../utils/screenNames';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { FontSizeContext } from '../../utils/Font/FontSizeContext';
import CustomModal from '../../components/CustomModal';
import { RootStackParamList } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Setting
>;
const Setting = () => {
    const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const { fontSize, setFontSize, fontSizes } = useContext(FontSizeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language,
  );
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleLogout = async () => {
    setModalVisible(false);
    await AsyncStorage.removeItem('isLoggedIn');
    try {
        await AsyncStorage.setItem('selectedLanguage', 'en');
        i18n.changeLanguage('en');
        I18nManager.forceRTL(false);
      } catch (error) {
        console.error('Error resetting language to English', error);
      }
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNames.Signin }],
    });
  };
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


  const selectLanguage = async (langCode: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('selectedLanguage', langCode);
      i18n.changeLanguage(langCode);
      
      if (langCode === 'ur') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }

      setSelectedLanguage(langCode);
      console.log("language select sucessfully", langCode)
    } catch (error) {
      console.error('Error saving language to AsyncStorage', error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.settingItem}>
      <Text style={[styles.label, { fontSize: fontSizes.title }]}>{t("screens.settings.language")}</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => selectLanguage(itemValue)}
          style={styles.picker}
        >
         <Picker.Item label={t("screens.settings.languageOptions.english")} value="en" />
          <Picker.Item label={t("screens.settings.languageOptions.german")} value="de" />
          <Picker.Item label={t("screens.settings.languageOptions.french")} value="fr" />
          <Picker.Item label={t("screens.settings.languageOptions.hindi")} value="hi" />
          <Picker.Item label={t("screens.settings.languageOptions.japanese")} value="ja" />
          <Picker.Item label={t("screens.settings.languageOptions.urdu")} value="ur" />
        </Picker>
      </View>
      <View style={styles.settingItem}>
      <Text style={[styles.label, { fontSize: fontSizes.title }]}>{t("screens.settings.fontSize")}</Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          value={fontSize}
          onValueChange={(value) => setFontSize(Math.round(value))}
        />
      </View>
      <View style={styles.settingItem}>
      <Text style={[styles.label, { fontSize: fontSizes.title }]}>{t("screens.settings.darkMode")}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <Button text={t("screens.settings.deleteAccount")}  onPress={() => Alert.alert('Account Deleted')}  style={styles.button} disabled={false}/>
      <Button  text={t("screens.settings.logOut")} onPress={() => setModalVisible(true)}  style={styles.button} disabled={false}/> 

<CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to logout?</Text>
          <View style={styles.modalButtons}>
           
            <Button text="OK" onPress={handleLogout} style={styles.okButton} disabled={false}/>
            <Button text="Cancel" onPress={() => setModalVisible(false)} style={styles.cancelButton} disabled={false}/>  
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default Setting;



