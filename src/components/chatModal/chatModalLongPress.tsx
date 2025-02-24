import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
import { Images } from '../../assets';
import strings from '../../utils/string';
import CustomModal from '../CustomModal';
import Button from '../Button';
import { colors } from '../../theme';
import { vh } from '../../utils/dimension';

  
  console.log(Images);
  const ChatModalLongPress = ({
    visible,
    ondismiss,
    selectedMessageId,
    onEmojiSelect,
    onDelete,
  }: {
    visible: any;
    ondismiss: any;
    selectedMessageId: any,
    onEmojiSelect: (messageId: string, emoji: { id: string; source: any }) => void;
    onDelete: (messageId: string) => void;
  }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(visible);
    const toggleModal = () => {
      ondismiss();
    };
  
    const emojis = [
      { id: 'emoji1', source: Images.emoji1 , emoji :'👍'},
      { id: 'emoji2', source: Images.emoji2 , emoji :'❤️' },
      { id: 'emoji3', source: Images.emoji3 , emoji :'😂'},
      { id: 'emoji4', source: Images.emoji4 , emoji :'🎉'},
      { id: 'emoji5', source: Images.emoji5 , emoji :'👎'},
    ];
  
  
    const handleEmojiPress = (emoji: { id: string; source: any }) => {
      
      console.log("Selected emoji:", emoji);
      onEmojiSelect(selectedMessageId, emoji); 
      toggleModal();
    };
    return (
      <View>
        <Modal transparent={true} animationType="fade" visible={visible}>
          <Pressable onPress={toggleModal} style={styles.container}>
            <View style={styles.modalContent}>
              <View style={styles.modalContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                 
                   {emojis.map((emoji, index) => (
                    <TouchableOpacity key={index} onPress={() => handleEmojiPress(emoji)}>
                      <Image style={{ height: 30, width: 30 }} source={emoji.source} />
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.modalButton}>
                  <Image source={Images.reply} style={styles.buttonIcon} />
                  <Text style={styles.modalButtonText}>{strings.chatOp1}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.modalButton}>
                  <Image source={Images.forward} style={styles.buttonIcon} />
                  <Text style={styles.modalButtonText}>{strings.chatOp2}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.modalButton}>
                  <Image source={Images.copy} style={styles.buttonIcon} />
                  <Text style={styles.modalButtonText}>{strings.chatOp3}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.modalButton}>
                  <Image source={Images.star} style={styles.buttonIcon} />
                  <Text style={styles.modalButtonText}>{strings.chatOp4}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.modalButton}>
                  <Image source={Images.edit} style={styles.buttonIcon} />
                  <Text style={styles.modalButtonText}>{strings.chatOp5}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.modalButton}  onPress={() => {
                    ondismiss()
                   setModalVisible(true)
                  }}>
                  <Image source={Images.delete} style={styles.buttonIcon} />
                  <Text style={styles.modalButtonTextDelete}>
                    {strings.chatModalButton4}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
       
        <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}> 
        <View style={styles.modalContents}>
          <Text style={styles.modalText}>Are you sure you want to delete?</Text>
          <View style={styles.modalButtons}>
            <Button
              text="OK"
              onPress={()=>{

                if (selectedMessageId) {
                  onDelete(selectedMessageId); 
                  toggleModal(); 
                }
                setModalVisible(false);
               
              }}
              style={styles.okButton}
              disabled={false}
            />
            <Button
              text="Cancel"
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
              disabled={false}
            />
          </View>
        </View>
      </CustomModal>

        
      </View>
    );
  };
  
  export default ChatModalLongPress;
  
  const styles = StyleSheet.create({
    modalContainer: {
      marginTop: 10,
      marginBottom: 20,
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 12,
      paddingVertical:vh(20)
      
    },

    modalContents: {
      backgroundColor: 'white',
      borderRadius: 12,
      paddingVertical:vh(20),
      marginHorizontal:vh(20)
      
    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    buttonIcon: {
      height: 20,
      width: 20,
    },
    modalButtonText: {
      fontSize: 17,
      fontWeight: '600',
      paddingLeft: 8,
      color: '#6a7a86',
    },
    modalButton: {
      flexDirection: 'row',
      marginVertical: 5,
      padding: 30,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#fafafa',
    },
    modalButtonTextDelete: {
      fontSize: 17,
      fontWeight: '600',
      paddingLeft: 8,
      color: 'red',
    },
    cancelButton: {
      backgroundColor: colors.lightGrey,
      padding: 10,
      flex: 1,
      // marginRight: 10,
    },
    okButton: {
      backgroundColor: 'red',
      padding: 10,
      flex: 1,
    },
    modalText: {
      fontSize: 18,
      fontWeight:'500',
      textAlign:'center'
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
  