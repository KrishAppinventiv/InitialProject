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
import { vh } from '../../utils/dimension';
import { colors } from '../../theme';

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
    keyboardType,
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
      {iconName && <MaterialIcons name={iconName} size={20} color={colors.lightGrey}  style={styles.iconLeft} />}

      <Text
        style={[
          styles.floatingLabel,iconName && {marginLeft:vh(18)},
          isDarkMode && {backgroundColor: colors.dark},
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
        keyboardType={keyboardType}
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
            size={20}
            color={colors.lightGrey}
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
    height:vh(38)
  },
  iconRight: {
    marginLeft: 10,
  },
  floatingLabel: {
    position: 'absolute',
    alignSelf:'center',
    left: 10,
    fontSize: 16,
    color: colors.lightGrey,
    backgroundColor: colors.white,
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
