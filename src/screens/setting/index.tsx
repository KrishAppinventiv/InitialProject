import Slider from '@react-native-community/slider';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Switch, I18nManager, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { colors } from '../../theme';
import { vh } from '../../theme/dimensions';
import Button from '../../components/Button';
import { ThemeContext } from '../../utils/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../utils/i18n';
import { ScreenNames } from '../../navigator/screenNames';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language,
  );
  const navigation=useNavigation();

  const selectLanguage = async langCode => {
    try {
      await AsyncStorage.setItem('selectedLanguage', langCode);
      console.log('langcode',langCode)
      i18n.changeLanguage(langCode);
      if (langCode === 'ur') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      setSelectedLanguage(langCode);
    } catch (error) {
      console.error('Error saving language to AsyncStorage', error);
    }
  };
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Language</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => selectLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="English"  />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="French" value="French" />
        </Picker>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Font Size</Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <Button text="Delete My Account"  onPress={() => Alert.alert('Account Deleted')}  style={styles.button} disabled={false}/>
      <Button text="Log Out"  onPress={() => navigation.navigate(ScreenNames.Signin)}  style={styles.button} disabled={false}/> 
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  settingItem: {
    marginBottom: 20,
    shadowColor:'#ccc',
    padding:vh(10),
    elevation:vh(5),
    borderWidth:2,
    backgroundColor:colors.main,
    borderColor:'#ccc',
    borderRadius:vh(20)
  },
  label: {
    fontSize: vh(18),
    marginBottom: 10,
    fontWeight:'600'
  },
  picker: {
    height: 50,
    width: 200,
  },
  button:{
    backgroundColor:colors.main,
    borderRadius:vh(20)
  }
});
