import React, { ReactNode } from 'react';
import { Modal, View, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            
              {children}
            
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
 
});

export default CustomModal;
