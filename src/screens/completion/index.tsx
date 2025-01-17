import { StyleSheet, Text, View , TouchableOpacity, ScrollView
   } from 'react-native'
import React, { useContext, useState } from 'react'
import { vh } from '../../theme/dimensions'
import InputField from '../../components/TextInput'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import { colors } from '../../theme';
import { ThemeContext } from '../../utils/theme-context';


const CompletionDetails = () => {
    
    const [isWhatsAppOptIn, setIsWhatsAppOptIn] = useState(false);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
    const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [addressID, setAddressID] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [branchName, setBranchName] = useState('');
  const [deliveryTimezone, setDeliveryTimezone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
 

  // Error States
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [addressIDError, setAddressIDError] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [branchNameError, setBranchNameError] = useState('');
  const [deliveryTimezoneError, setDeliveryTimezoneError] = useState('');
  const [deliveryNotesError, setDeliveryNotesError] = useState('');

  const toggleWhatsAppOptIn = () => {
    setIsWhatsAppOptIn(!isWhatsAppOptIn);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid Email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateField = (value: string, setError: (msg: string) => void, fieldName: string) => {
    if (!value.trim()) {
      setError(`${fieldName} is required`);
      return false;
    }
    setError('');
    return true;
  };
  
  const handleNext = () => {
    console.log('Next button clicked');
  };
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;    
  return (
    <ScrollView style={[styles.container,themeStyles]}>
     
     <InputField
        placeholder="Email ID"
        
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        onBlur={() => validateEmail(email)}
        style={[styles.inputField, emailError ? styles.errorBorder : {}]}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <InputField
        placeholder="Contact Number"
       
        value={contactNumber}
        onChangeText={(text) => {
          setContactNumber(text);
          validateField(text, setContactNumberError, 'Contact Number');
        }}
        onBlur={() => validateField(contactNumber, setContactNumberError, 'Contact Number')}
        style={[styles.inputField, contactNumberError ? styles.errorBorder : {}]}
      />
      {contactNumberError && <Text style={styles.errorText}>{contactNumberError}</Text>}


      <InputField
        placeholder="Address ID"
        value={addressID}
        onChangeText={(text) => {
          setAddressID(text);
          validateField(text, setAddressIDError, 'Address ID');
        }}
        onBlur={() => validateField(addressID, setAddressIDError, 'Address ID')}
        style={[styles.inputField, addressIDError ? styles.errorBorder : {}]}
      />
      {addressIDError && <Text style={styles.errorText}>{addressIDError}</Text>}

      
      <InputField
        placeholder="Start Time*"
        value={startTime}
        onChangeText={(text) => {
          setStartTime(text);
          validateField(text, setStartTimeError, 'Start Time');
        }}
        onBlur={() => validateField(startTime, setStartTimeError, 'Start Time')}
        rightIconName="access-time"
        style={[styles.inputField, startTimeError ? styles.errorBorder : {}]}
      />
      {startTimeError && <Text style={styles.errorText}>{startTimeError}</Text>}


      <InputField
        placeholder="End Time*"
        value={endTime}
        onChangeText={(text) => {
          setEndTime(text);
          validateField(text, setEndTimeError, 'End Time');
        }}
        onBlur={() => validateField(endTime, setEndTimeError, 'End Time')}
        rightIconName="access-time"
        style={[styles.inputField, endTimeError ? styles.errorBorder : {}]}
      />
      {endTimeError && <Text style={styles.errorText}>{endTimeError}</Text>}


      <InputField
        placeholder="Branch12222 Name*"
        value={branchName}
        onChangeText={(text) => {
          setBranchName(text);
          validateField(text, setBranchNameError, 'Branch Name');
        }}
        onBlur={() => validateField(branchName, setBranchNameError, 'Branch Name')}
        style={[styles.inputField, branchNameError ? styles.errorBorder : {}]}
      />
      {branchNameError && <Text style={styles.errorText}>{branchNameError}</Text>}

      <InputField
        placeholder="Delivery Timezone"
       
        value={deliveryTimezone}
        onChangeText={(text) => {
          setDeliveryTimezone(text);
          validateField(text, setDeliveryTimezoneError, 'Delivery Timezone');
        }}
        onBlur={() => validateField(deliveryTimezone, setDeliveryTimezoneError, 'Delivery Timezone')}
        style={[styles.inputField, deliveryTimezoneError ? styles.errorBorder : {}]}
      />
      {deliveryTimezoneError && <Text style={styles.errorText}>{deliveryTimezoneError}</Text>}



      <InputField
        placeholder="Delivery Notes"
        
        value={deliveryNotes}
        onChangeText={(text) => {
          setDeliveryNotes(text);
          validateField(text, setDeliveryNotesError, 'Delivery Notes');
        }}
        onBlur={() => validateField(deliveryNotes, setDeliveryNotesError, 'Delivery Notes')}
        style={[styles.inputField, deliveryNotesError ? styles.errorBorder : {}]}
      />
      {deliveryNotesError && <Text style={styles.errorText}>{deliveryNotesError}</Text>}

     
      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isWhatsAppOptIn}
          onClick={() => toggleWhatsAppOptIn()}
          checkBoxColor={isWhatsAppOptIn ? '#000' : '#4C4C6D'}
          checkedImage={
            <View style={styles.checkedBox}>
              <Text style={styles.tick}>✓</Text>
            </View>
          }
        />
        <Text style={[styles.checkboxLabel,{color:isDarkMode?"ffffff":"#000"}]}>WhatsApp Opt In</Text>
      </View>
  </ScrollView> 
  )
}

export default CompletionDetails

const styles = StyleSheet.create({
    container:{
       
        flex:1,
        padding:vh(15)
    },
    inputField: {
     
        paddingHorizontal: vh(10),
        paddingVertical:vh(7),
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#4C4C6D',
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
       marginBottom:vh(20)
      },
      checkboxLabel: {
        color: '#fff',
        fontSize: vh(13),
        marginLeft: 8,
        fontWeight:'500'
       
      },
      checkedBox: {
        width: 24,
        height: 24,
        backgroundColor: colors.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
      },
      tick: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
      },
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor: '#2d3040',
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
      },
      errorBorder: {
        borderColor: 'red',
      }
})