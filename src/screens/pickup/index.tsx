// Library Imports
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Custom Imports
import InputField from '../../components/TextInput';

// Utility Imports
import { ThemeContext } from '../../utils/theme-context';
import { vh } from '../../utils/dimension';

// Style Imports
import styles from './styles';

// Rest of the component code...

const PickupDetails = () => {
  type ErrorState = string;
  type FormFieldState = string;
  const [customerID, setCustomerID] = useState<FormFieldState>('');
  const [name, setName] = useState<FormFieldState>('');
  const [email, setEmail] = useState<FormFieldState>('');
  const [contactNumber, setContactNumber] = useState<FormFieldState>('');
  const [addressID, setAddressID] = useState<FormFieldState>('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
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
  const customerIDRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const contactNumberRef = useRef<TextInput>(null);
  const addressIDRef = useRef<TextInput>(null);
  const startTimeRef = useRef<TextInput>(null);
  const endTimeRef = useRef<TextInput>(null);
  const serviceTimeRef = useRef<TextInput>(null);
  const branchNameRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => {
      customerIDRef.current?.focus();
    }, 100);
  }, []);

  const {isDarkMode} = useContext(ThemeContext);
  const {t} = useTranslation();
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
    <ScrollView style={[styles.container, themeStyles]}>
      <View style={{marginBottom: vh(20)}}>
        <InputField
          ref={customerIDRef}
          placeholder={t('screens.pickupDetails.customerID')}
          textStyle={isDarkMode ? styles.white : styles.black}
          value={customerID}
          onSubmitEditing={() => nameRef.current?.focus()}
          onChangeText={text => {
            validateCustomerID(text);
            setCustomerID(text);
          }}
          style={[
            styles.inputField,
            customerIDError ? {borderColor: 'red'} : {},
          ]}
        />
        {customerIDError && (
          <Text style={styles.errorText}>{customerIDError}</Text>
        )}
        <InputField
          ref={nameRef}
          placeholder={t('screens.pickupDetails.name')}
          textStyle={isDarkMode ? styles.white : styles.black}
          value={name}
          onSubmitEditing={() => emailRef.current?.focus()}
          onChangeText={text => {
            validateName(text);
            setName(text);
          }}
          style={[styles.inputField, nameError ? {borderColor: 'red'} : {}]}
        />
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}
        <InputField
          ref={emailRef}
          placeholder={t('screens.pickupDetails.email')}
          value={email}
          onChangeText={text => {
            validateEmail(text);
            setEmail(text.toLowerCase());
          }}
          textStyle={isDarkMode ? styles.white : styles.black}
          onSubmitEditing={() => contactNumberRef.current?.focus()}
          style={[styles.inputField, emailError ? {borderColor: 'red'} : {}]}
        />

        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <InputField
          ref={contactNumberRef}
          placeholder={t('screens.pickupDetails.contactNumber')}
          textStyle={isDarkMode ? styles.white : styles.black}
          value={contactNumber}
          onChangeText={text => {
            validateContactNumber(text);
            setContactNumber(text);
          }}
          onSubmitEditing={() => addressIDRef.current?.focus()}
          style={[
            styles.inputField,
            contactNumberError ? {borderColor: 'red'} : {},
          ]}
        />
        {contactNumberError && (
          <Text style={styles.errorText}>{contactNumberError}</Text>
        )}
        <InputField
          ref={addressIDRef}
          placeholder={t('screens.pickupDetails.addressID')}
          textStyle={isDarkMode ? styles.white : styles.black}
          value={addressID}
          onChangeText={text => {
            validateAddressID(text);
            setAddressID(text);
          }}
          onSubmitEditing={() => startTimeRef.current?.focus()}
          style={[
            styles.inputField,
            addressIDError ? {borderColor: 'red'} : {},
          ]}
        />
        {addressIDError && (
          <Text style={styles.errorText}>{addressIDError}</Text>
        )}
        <InputField
          ref={startTimeRef}
          placeholder={t('screens.pickupDetails.startTime')}
          rightIconName="access-time"
          onRightIconPress={() => setOpenStartTime(true)}
          value={startTime}
          textStyle={isDarkMode ? styles.white : styles.black}
          onSubmitEditing={() => endTimeRef.current?.focus()}
          onChangeText={text => {
            validateStartTime(text);
            setStartTime(text);
          }}
          style={[
            styles.inputField,
            startTimeError ? {borderColor: 'red'} : {},
          ]}
        />
        {startTimeError && (
          <Text style={styles.errorText}>{startTimeError}</Text>
        )}

        <InputField
          ref={endTimeRef}
          placeholder={t('screens.pickupDetails.endTime')}
          rightIconName="access-time"
          onRightIconPress={() => setOpenEndTime(true)}
          value={endTime}
          onSubmitEditing={() => serviceTimeRef.current?.focus()}
          textStyle={isDarkMode ? styles.white : styles.black}
          onChangeText={text => {
            validateEndTime(text);
            setEndTime(text);
          }}
          style={[styles.inputField, endTimeError ? {borderColor: 'red'} : {}]}
        />
        {endTimeError && <Text style={styles.errorText}>{endTimeError}</Text>}
        <InputField
          ref={serviceTimeRef}
          placeholder={t('screens.pickupDetails.serviceTime')}
          onSubmitEditing={() => branchNameRef.current?.focus()}
          textStyle={isDarkMode ? styles.white : styles.black}
          value={serviceTime}
          onChangeText={text => {
            validateServiceTime(text);
            setServiceTime(text);
          }}
          style={[
            styles.inputField,
            serviceTimeError ? {borderColor: 'red'} : {},
          ]}
        />
        {serviceTimeError && (
          <Text style={styles.errorText}>{serviceTimeError}</Text>
        )}
        <InputField
          ref={serviceTimeRef}
          placeholder={t('screens.pickupDetails.branchName')}
          textStyle={isDarkMode ? styles.white : styles.black}
          value={branchName}
          onChangeText={text => {
            validateBranchName(text);
            setBranchName(text);
          }}
          style={[
            styles.inputField,
            branchNameError ? {borderColor: 'red'} : {},
          ]}
        />
        {branchNameError && (
          <Text style={styles.errorText}>{branchNameError}</Text>
        )}
      </View>

      <DateTimePickerModal
        isVisible={openStartTime}
        mode="time"
        onConfirm={(time: Date) => {
          const formattedTime = time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          setStartTime(formattedTime);
          setOpenStartTime(false);
        }}
        onCancel={() => setOpenStartTime(false)}
      />

      <DateTimePickerModal
        isVisible={openEndTime}
        mode="time"
        onConfirm={(time: Date) => {
          const formattedTime = time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          setEndTime(formattedTime);
          setOpenEndTime(false);
        }}
        onCancel={() => setOpenEndTime(false)}
      />
    </ScrollView>
  );
};

export default PickupDetails;
