import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { vh, vw } from '../../utils/dimension';


interface ButtonProps {
  onPress: () => void;
  text: string;
  style?: object;
  disabled: boolean
  textStyle?: object;
}

const Button: React.FC<ButtonProps> = ({ onPress, text, style ,disabled,textStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.buttonText,textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    paddingVertical: 16,
    marginHorizontal:vw(30),
    borderRadius: vh(20),
    marginTop: vh(30),
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'600'
  },
});

export default Button;
