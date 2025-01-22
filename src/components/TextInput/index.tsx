import React, {forwardRef, useContext, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ThemeContext} from '../../utils/theme-context';
import { vh } from '../../theme/dimensions';

interface InputFieldProps extends TextInputProps {
  style?: object;
  iconName?: string;
  togglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
  rightIconName?: string;
  onRightIconPress?: () => void;
  textStyle?: object;
  placeholderTextStyle?: object;
}

const InputField = forwardRef<TextInput, InputFieldProps>((props, ref) => {
  const {
    value,
    placeholder,
    onChangeText,
    style,
    onSubmitEditing,
    secureTextEntry,
    returnKeyType,
    iconName,
    togglePasswordVisibility,
    rightIconName,
    onRightIconPress,
    isPasswordVisible,
    textStyle,
    placeholderTextStyle,
  } = props;
  const {isDarkMode} = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, style]}>
      {iconName && <MaterialIcons name={iconName} size={20} color={'#ccc'}  style={styles.iconLeft} />}

      <Text
        style={[
          styles.floatingLabel,iconName && {marginLeft:vh(18)},
          isDarkMode && {backgroundColor: '#2d3040'},
          placeholderTextStyle,
          isFocused || value
            ? styles.floatingLabelActive
            : styles.floatingLabelInactive
        ]}>
        {placeholder}
      </Text>

      <TextInput
        ref={ref}
        style={[styles.input, textStyle,iconName && {marginLeft:vh(18)}]}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
      />

      {rightIconName && (
        <TouchableOpacity
          onPress={togglePasswordVisibility || onRightIconPress}>
          <MaterialIcons
            name={
              togglePasswordVisibility
                ? isPasswordVisible
                  ? 'visibility'
                  : 'visibility-off'
                : rightIconName
            }
            size={24}
            color={!isDarkMode ? '#000' : '#ccc'}
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
    borderRadius: 8,
   
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },

  iconRight: {
    marginLeft: 10,
  },
  floatingLabel: {
    position: 'absolute',
    alignSelf:'center',
    left: 10,
    fontSize: 16,
    color: '#ccc',
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  floatingLabelInactive: {
    top: 17,
    fontSize: 16,
  },
  floatingLabelActive: {
    top: -8, 
    fontSize: 12,
   
  },
  iconLeft: {
    position: 'absolute',
    left:vh(7),
   
  },
  
});

export default InputField;
