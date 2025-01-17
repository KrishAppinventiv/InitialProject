import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {vh} from '../../theme/dimensions';
import CheckBox from 'react-native-check-box';
import {colors} from '../../theme';
import { ThemeContext } from '../../utils/theme-context';

const GeneralDetail = () => {
  const itemsArray = ['Pickup Leg', 'Delivery Leg', 'Point to Point'];
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  const [checkedItems, setCheckedItems] = useState(
    new Array(itemsArray.length).fill(false)
  );

  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxToggle = index => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;    

  const renderItem = ({item, index}:any) => (
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
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container,themeStyles]}>
      <Text style={[styles.head,{color:isDarkMode?"#ffffff":"#000"}]}>shipment1 Type*</Text>
      <View>
        <FlatList
          data={itemsArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: vh(10)}}
        />
      </View>
      <Text style={[styles.head,,{color:isDarkMode?"#ffffff":"#000"}]}>Return shipment1</Text>
      <View>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity  onPress={() => setSelectedOption('Yes')}  style={styles.radioButton}>
          {selectedOption === 'Yes' && <View style={styles.radioButtonIcon} />}
            
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.leftText,{color:isDarkMode?"#ffffff":"#000"}]}>Yes</Text>
          </TouchableOpacity>
        </View> 
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity  onPress={() => setSelectedOption('No')} style={styles.radioButton}>
          {selectedOption === 'No' && <View style={styles.radioButtonIcon} />}
            
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.leftText,{color:isDarkMode?"#ffffff":"#000"}]}>No</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </View>
  );
};

export default GeneralDetail;

const styles = StyleSheet.create({
  head: {
    color: '#ffffff',
    fontSize: vh(15),
    fontWeight: '500'
  },
  container: {
   
    flex: 1,
    padding: vh(10)
  },
  checkbox: {
    padding: 10
  },
  leftText: {
    marginLeft: 10,
    fontSize: vh(13),
    color: '#ffffff',
    fontWeight: '500',
  },
  checkedText: {
    fontWeight: '600',
    color: colors.main,
  },
  checkedBox: {
    width: 24,
    height: 24,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  tick: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#A8A8A8',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vh(2),
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45,
    marginTop:vh(10)
  },
  radioButton: {
    height: 20,
    width: 20,
    // backgroundColor:colors.main,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.main,
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 10,
    width: 10,
    borderRadius: 7,
    backgroundColor: colors.main
  },

  lightMode:{
    backgroundColor:colors.white
  },
  darkMode:{
    backgroundColor: '#2d3040',
  },
  
  

});
