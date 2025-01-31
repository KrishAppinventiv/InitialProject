// Library Imports
import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Custom Imports
import CustomModal from '../../components/CustomModal';
import InputField from '../../components/TextInput';

// Utility Imports
import { ThemeContext } from '../../utils/theme-context';
import { priorityOptions } from '../../utils/constant';
import { vh } from '../../utils/dimension';
import { validateShipment } from '../../utils/commonfunction';

// Style Imports
import styles from './styles';
import { colors } from '../../theme';

// Rest of the component code...

const Shipment1Detail = () => {
  const {isDarkMode} = useContext(ThemeContext);
  const {t} = useTranslation();
  const [shipmentNumber, setShipmentNumber] = useState('');
  const [shipmentDateTimezone, setShipmentDateTimezone] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [priority, setPriority] = useState('');
  const [parentShipmentNumber, setParentShipmentNumber] = useState('');
  const [skillSet, setSkillSet] = useState('');
  const [deliveryAssociates, setDeliveryAssociates] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [autoAllocateProfileName, setAutoAllocateProfileName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [partialDelivery, setPartialDelivery] = useState(false);
  const [salesReturn, setSalesReturn] = useState(false);
  const [shipmentCancellation, setShipmentCancellation] = useState(false);

  // Error States
  const [shipmentNumberError, setShipmentNumberError] = useState('');
  const [shipmentDateTimezoneError, setShipmentDateTimezoneError] = useState('');
  const [shipmentDateError, setShipmentDateError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [serviceTimeError, setServiceTimeError] = useState('');
  const [autoAllocateProfileNameError, setAutoAllocateProfileNameError] =useState('');
  const [serviceTypeError, setServiceTypeError] = useState('');
  const shipmentNumberRef = useRef<TextInput>(null);
  const shipmentDateTimezoneRef = useRef<TextInput>(null);
  const shipmentDateRef = useRef<TextInput>(null);
  const priorityRef = useRef<TextInput>(null);
  const serviceTimeRef = useRef<TextInput>(null);
  const autoAllocateProfileNameRef = useRef<TextInput>(null);
  const serviceTypeRef = useRef<TextInput>(null);

  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      shipmentNumberRef.current?.focus();
    }, 100);
  }, []);


  const handleSelect = (selectedValue: string) => {
    const selectedOption = priorityOptions.find(
      option => option.value === selectedValue,
    );
    if (selectedOption) {
      setPriority(selectedOption.value);
      setParentShipmentNumber(selectedOption.parent);
      setSkillSet(selectedOption.skill);
      setDeliveryAssociates(selectedOption.associate);
    }
    setPickerVisible(false);
  };
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;

  return (
    <ScrollView style={[styles.container, themeStyles]}>
      <View style={{marginBottom: vh(20)}}>
        <InputField
          ref={shipmentNumberRef}
          placeholder={t('screens.shipmentDetail.shipmentNumber')}
          rightIconName="swap-horiz"
          value={shipmentNumber}
          textStyle={isDarkMode ? styles.white : styles.black}
          onSubmitEditing={() => shipmentDateTimezoneRef.current?.focus()}
          onChangeText={text => {
            setShipmentNumber(text);
            validateShipment(text, setShipmentNumberError, 'Shipment Number');
          }}
          style={[
            styles.inputField,
            shipmentNumberError ? styles.errorBorder : {},
          ]}
        />
        {shipmentNumberError && (
          <Text style={styles.errorText}>{shipmentNumberError}</Text>
        )}

        <InputField
          ref={shipmentDateTimezoneRef}
          placeholder={t('screens.shipmentDetail.shipmentDateTimezone')}
          rightIconName="expand-more"
          value={shipmentDateTimezone}
          onSubmitEditing={() => shipmentDateRef.current?.focus()}
          textStyle={isDarkMode ? styles.white : styles.black}
          onChangeText={text => {
            setShipmentDateTimezone(text);
            validateShipment(
              text,
              setShipmentDateTimezoneError,
              'Shipment Date Timezone',
            );
          }}
          style={[
            styles.inputField,
            shipmentDateTimezoneError ? styles.errorBorder : {},
          ]}
        />
        {shipmentDateTimezoneError && (
          <Text style={styles.errorText}>{shipmentDateTimezoneError}</Text>
        )}
        <InputField
          ref={shipmentDateRef}
          placeholder={t('screens.shipmentDetail.shipmentDate')}
          value={shipmentDate}
          textStyle={isDarkMode ? styles.white : styles.black}
          onChangeText={text => {
            setShipmentDate(text);
            validateShipment(text, setShipmentDateError, 'Shipment Date');
          }}
          onSubmitEditing={() => priorityRef.current?.focus()}
          style={[
            styles.inputField,
            shipmentDateError ? styles.errorBorder : {},
          ]}
        />
        {shipmentDateError && (
          <Text style={styles.errorText}>{shipmentDateError}</Text>
        )}

        <InputField
          ref={priorityRef}
          placeholder={t('screens.shipmentDetail.priority')}
          rightIconName="expand-more"
          onRightIconPress={() => setPickerVisible(true)}
          textStyle={isDarkMode ? styles.white : styles.black}
          value={priority}
          onSubmitEditing={() => serviceTimeRef.current?.focus()}
          onChangeText={text => {
            setPriority(text);
            validateShipment(text, setPriorityError, 'Priority');
          }}
          style={[styles.inputField, priorityError ? styles.errorBorder : {}]}
        />
        {priorityError && <Text style={styles.errorText}>{priorityError}</Text>}

        <InputField
          placeholder={t('screens.shipmentDetail.parentShipmentNumber')}
          value={parentShipmentNumber}
          textStyle={isDarkMode ? styles.white : styles.black}
          style={styles.inputField}
        />

        <InputField
          placeholder={t('screens.shipmentDetail.skillSet')}
          value={skillSet}
          textStyle={isDarkMode ? styles.white : styles.black}
          style={styles.inputField}
        />

        <InputField
          placeholder={t('screens.shipmentDetail.deliveryAssociates')}
          value={deliveryAssociates}
          textStyle={isDarkMode ? styles.white : styles.black}
          style={styles.inputField}
        />

        <View style={styles.toggleContainer}>
          <Text
            style={[
              styles.toggleLabel,
              {color: isDarkMode ? colors.white : colors.black},
            ]}>
            {t('screens.shipmentDetail.partialDelivery')}
          </Text>
          <Switch value={partialDelivery} onValueChange={setPartialDelivery} />
        </View>

        <View style={styles.toggleContainer}>
          <Text
            style={[
              styles.toggleLabel,
              {color: isDarkMode ? colors.white : colors.black},
            ]}>
            {t('screens.shipmentDetail.salesReturn')}
          </Text>
          <Switch value={salesReturn} onValueChange={setSalesReturn} />
        </View>

        <View style={styles.toggleContainer}>
          <Text
            style={[
              styles.toggleLabel,
              {color: isDarkMode ? colors.white : colors.black},
            ]}>
            {t('screens.shipmentDetail.shipmentCancellation')}
          </Text>
          <Switch
            value={shipmentCancellation}
            onValueChange={setShipmentCancellation}
          />
        </View>

        <InputField
          placeholder={t('screens.shipmentDetail.serviceTime')}
          ref={serviceTimeRef}
          value={serviceTime}
          textStyle={isDarkMode ? styles.white : styles.black}
          onChangeText={text => {
            setServiceTime(text);
            validateShipment(text, setServiceTimeError, 'Service Time');
          }}
          onSubmitEditing={() => autoAllocateProfileNameRef.current?.focus()}
          style={[
            styles.inputField,
            serviceTimeError ? styles.errorBorder : {},
          ]}
        />
        {serviceTimeError && (
          <Text style={styles.errorText}>{serviceTimeError}</Text>
        )}

        <InputField
          ref={autoAllocateProfileNameRef}
          placeholder={t('screens.shipmentDetail.autoAllocateProfileName')}
          onSubmitEditing={() => serviceTypeRef.current?.focus()}
          value={autoAllocateProfileName}
          textStyle={isDarkMode ? styles.white : styles.black}
          onChangeText={text => {
            setAutoAllocateProfileName(text);
            validateShipment(
              text,
              setAutoAllocateProfileNameError,
              'AutoAllocate Profile Name',
            );
          }}
          style={[
            styles.inputField,
            autoAllocateProfileNameError ? styles.errorBorder : {},
          ]}
        />
        {autoAllocateProfileNameError && (
          <Text style={styles.errorText}>{autoAllocateProfileNameError}</Text>
        )}

        <InputField
          placeholder={t('screens.shipmentDetail.serviceType')}
          ref={serviceTypeRef}
          value={serviceType}
          textStyle={isDarkMode ? styles.white : styles.black}
          onChangeText={text => {
            setServiceType(text);
            validateShipment(text, setServiceTypeError, 'Service Type');
          }}
          style={[
            styles.inputField,
            serviceTypeError ? styles.errorBorder : {},
          ]}
        />
        {serviceTypeError && (
          <Text style={styles.errorText}>{serviceTypeError}</Text>
        )}

        <CustomModal modalVisible={isPickerVisible} setModalVisible={setPickerVisible}>
        <View style={[styles.modalContent, isDarkMode?styles.lightMode:styles.darkMode]}>
          <Text style={[styles.modalTitle, {color:isDarkMode?colors.black:colors.white}]}>Select Priority</Text>
          <Picker 
             
            selectedValue={priority}
            onValueChange={(itemValue) => handleSelect(itemValue)}
            style={[styles.picker,{color:isDarkMode?colors.black:colors.white}]}
          >
            {priorityOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value}/>
            ))}
          </Picker>

          <TouchableOpacity onPress={() => setPickerVisible(false)} style={styles.closeButton}>
            <Text style={[styles.closeButtonText]}>Close</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
      </View>
    </ScrollView>
  );
};

export default Shipment1Detail;
