// Library Imports
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomTextInput from '@krishna_gupta/custom-textinput'
// Custom Imports
import InputField from '../../components/TextInput';

// Utility Imports
import { validateField } from '../../utils/commonfunction';
import { ThemeContext } from '../../utils/theme-context';

// Style Imports
import { colors } from '../../theme';
import styles from './styles';

const CompletionDetails = () => {
  const [isWhatsAppOptIn, setIsWhatsAppOptIn] = useState(false);
  const {isDarkMode} = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [addressID, setAddressID] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [deliveryTimezone, setDeliveryTimezone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const {t} = useTranslation();
  // Error States
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [addressIDError, setAddressIDError] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [branchNameError, setBranchNameError] = useState('');
  const [deliveryTimezoneError, setDeliveryTimezoneError] = useState('');
  const [deliveryNotesError, setDeliveryNotesError] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const contactNumberRef = useRef<TextInput | null>(null);
  const addressIDRef = useRef<TextInput | null>(null);
  const startTimeRef = useRef<TextInput | null>(null);
  const endTimeRef = useRef<TextInput | null>(null);
  const branchNameRef = useRef<TextInput | null>(null);
  const deliveryTimezoneRef = useRef<TextInput | null>(null);
  const deliveryNotesRef = useRef<TextInput | null>(null);
  const toggleWhatsAppOptIn = () => {
    setIsWhatsAppOptIn(!isWhatsAppOptIn);
  };
  useEffect(() => {
    setTimeout(() => {
      emailRef.current?.focus();
    }, 100);
  }, []);

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
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;
  return (
    <ScrollView style={[styles.container, themeStyles]}>
      <InputField
        ref={emailRef}
        placeholder={t('screens.completion.email')}
        textStyle={isDarkMode ? styles.white : styles.black}
        value={email}
        onChangeText={text => {
          setEmail(text);
          validateEmail(text);
        }}
        onBlur={() => validateEmail(email)}
        onSubmitEditing={() => contactNumberRef.current?.focus()}
        style={[styles.inputField, emailError ? styles.errorBorder : {}]}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <InputField
        ref={contactNumberRef}
        placeholder={t('screens.completion.contactNumber')}
        value={contactNumber}
        textStyle={isDarkMode ? styles.white : styles.black}
        onChangeText={text => {
          setContactNumber(text);
          validateField(text, setContactNumberError, 'Contact Number');
        }}
        onBlur={() =>
          validateField(contactNumber, setContactNumberError, 'Contact Number')
        }
        onSubmitEditing={() => addressIDRef.current?.focus()}
        style={[
          styles.inputField,
          contactNumberError ? styles.errorBorder : {},
        ]}
      />
      {contactNumberError && (
        <Text style={styles.errorText}>{contactNumberError}</Text>
      )}

      <InputField
        ref={addressIDRef}
        placeholder={t('screens.completion.addressID')}
        value={addressID}
        textStyle={isDarkMode ? styles.white : styles.black}
        onChangeText={text => {
          setAddressID(text);
          validateField(text, setAddressIDError, 'Address ID');
        }}
        onBlur={() => validateField(addressID, setAddressIDError, 'Address ID')}
        onSubmitEditing={() => startTimeRef.current?.focus()}
        style={[styles.inputField, addressIDError ? styles.errorBorder : {}]}
      />
      {addressIDError && <Text style={styles.errorText}>{addressIDError}</Text>}

      <InputField
        ref={startTimeRef}
        placeholder={t('screens.completion.startTime')}
        value={startTime}
        onRightIconPress={() => setOpenStartTime(true)}
        textStyle={isDarkMode ? styles.white : styles.black}
        onChangeText={text => {
          setStartTime(text);
          validateField(text, setStartTimeError, 'Start Time');
        }}
        onBlur={() => validateField(startTime, setStartTimeError, 'Start Time')}
        onSubmitEditing={() => endTimeRef.current?.focus()}
        rightIconName="access-time"
        style={[styles.inputField, startTimeError ? styles.errorBorder : {}]}
      />
      {startTimeError && <Text style={styles.errorText}>{startTimeError}</Text>}

      <InputField
        ref={endTimeRef}
        placeholder={t('screens.completion.endTime')}
        value={endTime}
        onRightIconPress={() => setOpenEndTime(true)}
        textStyle={isDarkMode ? styles.white : styles.black}
        onChangeText={text => {
          setEndTime(text);
          validateField(text, setEndTimeError, 'End Time');
        }}
        onBlur={() => validateField(endTime, setEndTimeError, 'End Time')}
        onSubmitEditing={() => branchNameRef.current?.focus()}
        rightIconName="access-time"
        style={[styles.inputField, endTimeError ? styles.errorBorder : {}]}
      />
      {endTimeError && <Text style={styles.errorText}>{endTimeError}</Text>}

      <InputField
        ref={branchNameRef}
        placeholder={t('screens.completion.branchName')}
        value={branchName}
        textStyle={isDarkMode ? styles.white : styles.black}
        onChangeText={text => {
          setBranchName(text);
          validateField(text, setBranchNameError, 'Branch Name');
        }}
        onBlur={() =>
          validateField(branchName, setBranchNameError, 'Branch Name')
        }
        onSubmitEditing={() => deliveryTimezoneRef.current?.focus()}
        style={[styles.inputField, branchNameError ? styles.errorBorder : {}]}
      />
      {branchNameError && (
        <Text style={styles.errorText}>{branchNameError}</Text>
      )}

      {/* <InputField
        ref={deliveryTimezoneRef}
        placeholder={t('screens.completion.deliveryTimezone')}
        textStyle={isDarkMode ? styles.white : styles.black}
        value={deliveryTimezone}
        onChangeText={text => {
          setDeliveryTimezone(text);
          validateField(text, setDeliveryTimezoneError, 'Delivery Timezone');
        }}
        onSubmitEditing={() => deliveryNotesRef.current?.focus()}
        onBlur={() =>
          validateField(
            deliveryTimezone,
            setDeliveryTimezoneError,
            'Delivery Timezone',
          )
        }
        style={[
          styles.inputField,
          deliveryTimezoneError ? styles.errorBorder : {},
        ]}
      /> */}
      <CustomTextInput
        ref={deliveryTimezoneRef}
        placeholder={t('screens.completion.deliveryTimezone')}
        textStyle={isDarkMode ? styles.white : styles.black}
        value={deliveryTimezone}
        onChangeText={text => {
          setDeliveryTimezone(text);
          validateField(text, setDeliveryTimezoneError, 'Delivery Timezone');
        }}
        onSubmitEditing={() => deliveryNotesRef.current?.focus()}
        onBlur={() =>
          validateField(
            deliveryTimezone,
            setDeliveryTimezoneError,
            'Delivery Timezone',
          )
        }
        style={[
          styles.inputField,
          deliveryTimezoneError ? styles.errorBorder : {},
        ]}
      />
      {deliveryTimezoneError && (
        <Text style={styles.errorText}>{deliveryTimezoneError}</Text>
      )}

      <InputField
        ref={deliveryNotesRef}
        placeholder={t('screens.completion.deliveryNotes')}
        textStyle={isDarkMode ? styles.white : styles.black}
        value={deliveryNotes}
        onChangeText={text => {
          setDeliveryNotes(text);
          validateField(text, setDeliveryNotesError, 'Delivery Notes');
        }}
        onBlur={() =>
          validateField(deliveryNotes, setDeliveryNotesError, 'Delivery Notes')
        }
        style={[
          styles.inputField,
          deliveryNotesError ? styles.errorBorder : {},
        ]}
      />
      {deliveryNotesError && (
        <Text style={styles.errorText}>{deliveryNotesError}</Text>
      )}

      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isWhatsAppOptIn}
          onClick={() => toggleWhatsAppOptIn()}
          checkBoxColor={isWhatsAppOptIn ? colors.black : colors.purpleShade}
          checkedImage={
            <View style={styles.checkedBox}>
              <Text style={styles.tick}>✓</Text>
            </View>
          }
        />
        <Text
          style={[
            styles.checkboxLabel,
            {color: isDarkMode ? colors.white : colors.black},
          ]}>
          {' '}
          {t('screens.completion.whatsappOptIn')}
        </Text>
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

export default CompletionDetails;
