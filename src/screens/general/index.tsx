import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {vh} from '../../theme/dimensions';
import CheckBox from 'react-native-check-box';
import {colors} from '../../theme';
import { ThemeContext } from '../../utils/theme-context';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const GeneralDetail = () => {

  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
 
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('');

 const handleCheckboxToggle = (index: number): void => {
  setCheckedItems(prevCheckedItems => {
    const updatedCheckedItems = [...prevCheckedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    return updatedCheckedItems;
  });
};

const itemsArray: ListItem[] = [
    { id: 1, text: 'Pickup Leg' },
    { id: 2, text: 'Delivery Leg' },
    { id: 3, text: 'Point to Point' },
  ];

  const [checkedItems, setCheckedItems] = useState(
    new Array(itemsArray.length).fill(false)
  );
  

interface ListItem {
    id: number;
    text: string;
  }

  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;    

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleCheckboxToggle(index)}>
      <View style={styles.item}>
        <CheckBox
          style={styles.checkbox}
          onClick={() => handleCheckboxToggle(index)}
          isChecked={checkedItems[index]}
          checkBoxColor={checkedItems[index] ? '#000' : '#000'}
          checkedImage={
            <View style={styles.checkedBox}>
              <Text style={styles.tick}>✓</Text>
            </View>
          }
          unCheckedImage={<View style={styles.uncheckedBox} />}
        />

        <Text
          style={[styles.leftText, checkedItems[index] && styles.checkedText,{color:isDarkMode?"#ffffff":"#000"}]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container,themeStyles]}>
      <Text style={[styles.head,{color:isDarkMode?"#ffffff":"#000"}]}>{t('screens.general.shipmentType')}</Text>
      <View>
        <FlatList 
          data={itemsArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: vh(10)}}
        />
      </View>
      <Text style={[styles.head,,{color:isDarkMode?"#ffffff":"#000"}]}>{t('screens.general.returnShipment')}</Text>
      <View>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity  onPress={() => setSelectedOption('Yes')}  style={styles.radioButton}>
          {selectedOption === 'Yes' && <View style={styles.radioButtonIcon} />}
            
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.leftText,{color:isDarkMode?"#ffffff":"#000"}]}> {t('screens.general.yes')}</Text>
          </TouchableOpacity>
        </View> 
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity  onPress={() => setSelectedOption('No')} style={styles.radioButton}>
          {selectedOption === 'No' && <View style={styles.radioButtonIcon} />}
            
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.leftText,{color:isDarkMode?"#ffffff":"#000"}]}> {t('screens.general.no')}</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </View>
  );
};

export default GeneralDetail;
