// Library Imports
import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import CheckBox from 'react-native-check-box';

// Utility Imports
import {vh} from '../../utils/dimension';
import {ThemeContext} from '../../utils/theme-context';

//Custom Import
import CustomFlatList from '../../components/CustomFlatList';

// Style Imports
import styles from './styles';
import { colors } from '../../theme';

const GeneralDetail = () => {
  const {isDarkMode} = useContext(ThemeContext);

  const {t} = useTranslation();
  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxToggle = (index: number): void => {
    setCheckedItems(prevCheckedItems => {
      const updatedCheckedItems = [...prevCheckedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      return updatedCheckedItems;
    });
  };

  const itemsArray: ListItem[] = [
    {id: 1, text: 'Pickup Leg'},
    {id: 2, text: 'Delivery Leg'},
    {id: 3, text: 'Point to Point'},
  ];

  const [checkedItems, setCheckedItems] = useState(
    new Array(itemsArray.length).fill(false),
  );

  interface ListItem {
    id: number;
    text: string;
  }
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;

  const renderGeneral = ({item, index}: {item: ListItem; index: number}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleCheckboxToggle(index)}>
      <View style={styles.item}>
        <CheckBox
          style={styles.checkbox}
          onClick={() => handleCheckboxToggle(index)}
          isChecked={checkedItems[index]}
          checkBoxColor={checkedItems[index] ? colors.black : colors.black}
          checkedImage={
            <View style={styles.checkedBox}>
              <Text style={styles.tick}>✓</Text>
            </View>
          }
          unCheckedImage={<View style={styles.uncheckedBox} />}
        />

        <Text
          style={[
            styles.leftText,
            checkedItems[index] && styles.checkedText,
            {color: isDarkMode ? colors.white : colors.black},
          ]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={[styles.head, {color: isDarkMode ? colors.white : colors.black}]}>
        {t('screens.general.shipmentType')}
      </Text>
      <View>
        <CustomFlatList
          data={itemsArray}
          renderItem={renderGeneral}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: vh(10)}}
        />
      </View>
      <Text style={[styles.head, , {color: isDarkMode ? colors.white : colors.black}]}>
        {t('screens.general.returnShipment')}
      </Text>
      <View>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity
            onPress={() => setSelectedOption('Yes')}
            style={styles.radioButton}>
            {selectedOption === 'Yes' && (
              <View style={styles.radioButtonIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[
                styles.leftText,
                {color: isDarkMode ? colors.white : colors.black},
              ]}>
              {' '}
              {t('screens.general.yes')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity
            onPress={() => setSelectedOption('No')}
            style={styles.radioButton}>
            {selectedOption === 'No' && <View style={styles.radioButtonIcon} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[
                styles.leftText,
                {color: isDarkMode ? colors.white : colors.black},
              ]}>
              {' '}
              {t('screens.general.no')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GeneralDetail;
