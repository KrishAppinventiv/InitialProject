import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import InputField from '../../components/TextInput'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { vh } from '../../theme/dimensions';
import { colors } from '../../theme';
import { ThemeContext } from '../../utils/theme-context';

const PickupDetails = () => {
    type ErrorState = string;
    type FormFieldState = string;
    const [customerID, setCustomerID] = useState<FormFieldState>('');
  const [name, setName] = useState<FormFieldState>('');
  const [email, setEmail] = useState<FormFieldState>('');
  const [contactNumber, setContactNumber] = useState<FormFieldState>('');
  const [addressID, setAddressID] = useState<FormFieldState>('');
  const [startTime, setStartTime] = useState<FormFieldState>('');
  const [endTime, setEndTime] = useState<FormFieldState>('');
  const [serviceTime, setServiceTime] = useState<FormFieldState>('');
  const [branchName, setBranchName] = useState<FormFieldState>('');

  const [customerIDError, setCustomerIDError] = useState<ErrorState>('');
  const [nameError, setNameError] = useState<ErrorState>('');
  const [emailError, setEmailError] = useState<ErrorState>('');
  const [contactNumberError, setContactNumberError] = useState<ErrorState>('');
  const [addressIDError, setAddressIDError] = useState<ErrorState>('');
  const [startTimeError, setStartTimeError] = useState<ErrorState>('');
  const [endTimeError, setEndTimeError] = useState<ErrorState>('');
  const [serviceTimeError, setServiceTimeError] = useState<ErrorState>('');
  const [branchNameError, setBranchNameError] = useState<ErrorState>('');
    
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
   
  const validateCustomerID = (value: string) => {
    if (!value.trim()) {
      setCustomerIDError('Customer ID is required');
      return false;
    }
    setCustomerIDError('');
    return true;
  };

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError('Name is required');
      return false;
    }
    setNameError('');
    return true;
  };
    const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;    

      const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
        if (!emailRegex.test(email)) {
          setEmailError('Invalid Email format');
          return false;
        } 
          setEmailError('');
        
  
        return true;
      };

      const validateContactNumber = (value: string) => {
        const phoneRegex = /^[0-9]{10}$/; 
        if (!value.trim()) {
          setContactNumberError('Contact Number is required');
          return false;
        }
        if (!phoneRegex.test(value)) {
          setContactNumberError('Invalid Contact Number');
          return false;
        }
        setContactNumberError('');
        return true;
      };
    
      const validateAddressID = (value: string) => {
        if (!value.trim()) {
          setAddressIDError('Address ID is required');
          return false;
        }
        setAddressIDError('');
        return true;
      };
      const validateStartTime = (value: string) => {
        if (!value.trim()) {
          setStartTimeError('Start Time is required');
          return false;
        }
        setStartTimeError('');
        return true;
      };
    
      const validateEndTime = (value: string) => {
        if (!value.trim()) {
          setEndTimeError('End Time is required');
          return false;
        }
        setEndTimeError('');
        return true;
      };
    
      const validateServiceTime = (value: string) => {
        if (!value.trim()) {
          setServiceTimeError('Service Time is required');
          return false;
        }
        setServiceTimeError('');
        return true;
      };
    
      const validateBranchName = (value: string) => {
        if (!value.trim()) {
          setBranchNameError('Branch Name is required');
          return false;
        }
        setBranchNameError('');
        return true;
      };
  return (
    <ScrollView style={[styles.container,themeStyles]}>
         <View style={{marginBottom:vh(20)}}>
    <InputField
        placeholder="Customer ID*"
        textStyle={styles.white}
        onChangeText={(text) => {
            validateCustomerID(text);
            setCustomerID(text);
          }}
          style={[styles.inputField, customerIDError ? {borderColor: 'red'} : {}]}
      />
      {customerIDError && <Text style={styles.errorText}>{customerIDError}</Text>}
      <InputField
        placeholder="Name*"
        textStyle={styles.white}

        onChangeText={(text) => {
            validateName(text);
            setName(text);
          }}
          style={[styles.inputField, nameError ? {borderColor: 'red'} : {}]}
      />
      {nameError && <Text style={styles.errorText}>{nameError}</Text>}
      <InputField
        placeholder="Email ID"
        value={email}
        onChangeText={text => {
            validateEmail(text)
            setEmail(text.toLowerCase())
        }}
        textStyle={styles.white}
        onSubmitEditing={() => {
            validateEmail(email);
            
          }}
        style={[styles.inputField,emailError ? {borderColor: 'red'} : {}]}
      />

{emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <InputField
        placeholder="Contact Number"
        textStyle={styles.white}
        onChangeText={(text) => {
            validateContactNumber(text);
            setContactNumber(text);
          }}
          style={[styles.inputField, contactNumberError ? {borderColor: 'red'} : {}]}
        />
        {contactNumberError && <Text style={styles.errorText}>{contactNumberError}</Text>}
      <InputField
        placeholder="Address ID"
        textStyle={styles.white}
        onChangeText={(text) => {
            validateAddressID(text);
            setAddressID(text);
          }}
          style={[styles.inputField, addressIDError ? {borderColor: 'red'} : {}]}
        />
        {addressIDError && <Text style={styles.errorText}>{addressIDError}</Text>}
      <InputField
        placeholder="Start Time*"
        rightIconName='access-time'
        
        textStyle={styles.white}
        onChangeText={(text) => {
            validateStartTime(text);
            setStartTime(text);
          }}
          style={[styles.inputField, startTimeError ? {borderColor: 'red'} : {}]}
        />
        {startTimeError && <Text style={styles.errorText}>{startTimeError}</Text>}

      <InputField
        placeholder="End Time*"
        rightIconName='access-time'
      
        textStyle={styles.white}
        onChangeText={(text) => {
            validateEndTime(text);
            setEndTime(text);
          }}
          style={[styles.inputField, endTimeError ? {borderColor: 'red'} : {}]}
        />
        {endTimeError && <Text style={styles.errorText}>{endTimeError}</Text>}
      <InputField
        placeholder="Service Time (mins)"
        textStyle={styles.white}
        onChangeText={(text) => {
            validateServiceTime(text);
            setServiceTime(text);
          }}
          style={[styles.inputField, serviceTimeError ? {borderColor: 'red'} : {}]}
        />
        {serviceTimeError && <Text style={styles.errorText}>{serviceTimeError}</Text>}
      <InputField
        placeholder="Branch12322 Name*"
        textStyle={styles.white}
        onChangeText={(text) => {
            validateBranchName(text);
            setBranchName(text);
          }}
          style={[styles.inputField, branchNameError ? {borderColor: 'red'} : {}]}
        />
        {branchNameError && <Text style={styles.errorText}>{branchNameError}</Text>}
      
      </View>
  </ScrollView>
  )
}

export default PickupDetails

const styles = StyleSheet.create({
    container:{
       
        flex:1,
        padding: 16,
    },
    inputField: {
        paddingHorizontal: vh(8),
        paddingVertical:vh(7),
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#4C4C6D',
        color: '#fff',
      },
      errorText: {
        color: 'red',
        fontSize: 12,
      
        marginLeft: 10,
      },
      white:{
        color:'#ffffff'
      },
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor: '#2d3040',
      }
})