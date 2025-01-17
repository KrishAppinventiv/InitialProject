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
import {vh} from '../../theme/dimensions';
import {Images} from '../../assets';
import {ThemeContext} from '../../utils/theme-context';

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
  const {isDarkMode, toggleTheme} = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, style]}>
      {iconName && <MaterialIcons name={iconName} size={20} color={'#ccc'} />}

      <Text
        style={[
          styles.floatingLabel,
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
        style={[styles.input, textStyle]}
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
    left: 10,
    fontSize: 16,
    color: '#ccc',
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  floatingLabelInactive: {
    top: 15,
    fontSize: 16,
  },
  floatingLabelActive: {
    top: -8, 
    fontSize: 12,
   
  },
  iconLeft: {
    position: 'absolute',
    left: 10, 
    zIndex: 2,
  },
});

export default InputField;
