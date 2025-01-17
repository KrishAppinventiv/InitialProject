import React, { forwardRef, useContext } from 'react';
import { TextInput, StyleSheet, TextInputProps, View, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { vh } from '../../theme/dimensions';
import { Images } from '../../assets';
import { ThemeContext } from '../../utils/theme-context';

interface InputFieldProps extends TextInputProps {
  style?: object;
  iconName?: string;
  togglePasswordVisibility?: () => void; 
  isPasswordVisible?: boolean;
  rightIconName?: string; 
  onRightIconPress?: () => void; 
  textStyle?:object;
  
}

const InputField = forwardRef<TextInput, InputFieldProps>((props, ref) => {

  const { value, placeholder, onChangeText, style, onSubmitEditing, secureTextEntry, returnKeyType, iconName ,togglePasswordVisibility, rightIconName, onRightIconPress,
    isPasswordVisible ,textStyle } = props;
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={20}
          color={'#ccc'}
         
        />
      )}
      <TextInput
        ref={ref}
        style={[styles.input,textStyle]}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={'#ccc'}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
      />

{rightIconName && (
        <TouchableOpacity onPress={togglePasswordVisibility || onRightIconPress}>
          <MaterialIcons 
            name={togglePasswordVisibility ? (isPasswordVisible ? 'visibility' : 'visibility-off') : rightIconName} 
            size={24} 
            color={!isDarkMode?'#000':'#ccc'} 
            style={styles.iconRight} 
          />
        </TouchableOpacity>
      )}
    </View> 
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
   
    borderRadius: 8
  },
  input: {
    flex: 1, 
    padding: 10,
    fontSize: 16,
  },
 
  img2: {
    width: vh(17),
    height: vh(17),
   
  },
  iconRight: {
    marginLeft: 10,
  }
});

export default InputField;
