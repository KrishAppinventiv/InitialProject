import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import InputField from '../../components/TextInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {vh} from '../../theme/dimensions';
import { ThemeContext } from '../../utils/theme-context';
import { colors } from '../../theme';
const Shipment1Detail = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

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
  const [autoAllocateProfileNameError, setAutoAllocateProfileNameError] = useState('');
  const [serviceTypeError, setServiceTypeError] = useState('');



  const validateField = (value: string, setError: (msg: string) => void, fieldName: string) => {
    if (!value.trim()) {
      setError(`${fieldName} is required`);
      return false;
    }
    setError('');
    return true;
  };
  const themeStyles = isDarkMode ? styles.darkMode : styles.lightMode;   

  return (
    <ScrollView style={[styles.container,themeStyles]}>
        <View style={{marginBottom:vh(20)}}>
      <InputField
        placeholder="Shipment1 Number"
        rightIconName='swap-horiz'
        value={shipmentNumber}
        textStyle={styles.white}
        onChangeText={(text) => {
            setShipmentNumber(text);
            validateField(text, setShipmentNumberError, 'Shipment Number');
          }}
          style={[styles.inputField, shipmentNumberError ? styles.errorBorder : {}]}
        />
        {shipmentNumberError && <Text style={styles.errorText}>{shipmentNumberError}</Text>}


      <InputField
        placeholder="Shipment1 Date Timezone"
        rightIconName='expand-more'
        value={shipmentDateTimezone}
        textStyle={styles.white}
        onChangeText={(text) => {
          setShipmentDateTimezone(text);
          validateField(text, setShipmentDateTimezoneError, 'Shipment Date Timezone');
        }}
        style={[styles.inputField, shipmentDateTimezoneError ? styles.errorBorder : {}]}
      />
      {shipmentDateTimezoneError && <Text style={styles.errorText}>{shipmentDateTimezoneError}</Text>}
      <InputField
        placeholder="Shipment1 Date*"
        value={shipmentDate}
        textStyle={styles.white}
          onChangeText={(text) => {
            setShipmentDate(text);
            validateField(text, setShipmentDateError, 'Shipment Date');
          }}
          style={[styles.inputField, shipmentDateError ? styles.errorBorder : {}]}
        />
        {shipmentDateError && <Text style={styles.errorText}>{shipmentDateError}</Text>}

      <InputField
        placeholder="Priority"
        rightIconName='expand-more'
        textStyle={styles.white}
        value={priority}
          onChangeText={(text) => {
            setPriority(text);
            validateField(text, setPriorityError, 'Priority');
          }}
          style={[styles.inputField, priorityError ? styles.errorBorder : {}]}
        />
        {priorityError && <Text style={styles.errorText}>{priorityError}</Text>}

     
      <InputField
        placeholder="Parent shipment1 Number"
        value={parentShipmentNumber}
        textStyle={styles.white}
        onChangeText={(text) => {
          setParentShipmentNumber(text);
          
        }}
        style={styles.inputField}
      />

     
      <InputField
        placeholder="Skill Set"
        value={skillSet}
        textStyle={styles.white}
          onChangeText={(text) => {
            setSkillSet(text);
           
          }}
        style={styles.inputField}
      />

      
      <InputField
        placeholder="Delivery Associates"
        value={deliveryAssociates}
        textStyle={styles.white}
          onChangeText={(text) => {
            setDeliveryAssociates(text);
           
          }}
        style={styles.inputField}
      />

    
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleLabel,{color:isDarkMode?"#ffffff":"#000"}]}>Partial Delivery Allowed</Text>
        <Switch value={partialDelivery} onValueChange={setPartialDelivery} />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleLabel,{color:isDarkMode?"#ffffff":"#000"}]}>Sales Return Allowed</Text>
        <Switch value={salesReturn} onValueChange={setSalesReturn} />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleLabel,{color:isDarkMode?"#ffffff":"#000"}]}>Shipment1 Cancellation Allowed</Text>
        <Switch
          value={shipmentCancellation}
          onValueChange={setShipmentCancellation}
        />
      </View>

     
      <InputField
        placeholder="Service Time (in minutes)"
        iconName="timer"
        value={serviceTime}
        textStyle={styles.white}
        onChangeText={(text) => {
          setServiceTime(text);
          validateField(text, setServiceTimeError, 'Service Time');
        }}
        style={[styles.inputField, serviceTimeError ? styles.errorBorder : {}]}
      />
      {serviceTimeError && <Text style={styles.errorText}>{serviceTimeError}</Text>}
      
      <InputField
        placeholder="AutoAllocate Profile Name"
        iconName="assignment"
        value={autoAllocateProfileName}
        textStyle={styles.white}
        onChangeText={(text) => {
          setAutoAllocateProfileName(text);
          validateField(text, setAutoAllocateProfileNameError, 'AutoAllocate Profile Name');
        }}
        style={[styles.inputField, autoAllocateProfileNameError ? styles.errorBorder : {}]}
      />
      {autoAllocateProfileNameError && <Text style={styles.errorText}>{autoAllocateProfileNameError}</Text>}
    
      <InputField
        placeholder="Service Type"
        iconName="build-circle"
        value={serviceType}
        textStyle={styles.white}
          onChangeText={(text) => {
            setServiceType(text);
            validateField(text, setServiceTypeError, 'Service Type');
          }}
          style={[styles.inputField, serviceTypeError ? styles.errorBorder : {}]}
        />
        {serviceTypeError && <Text style={styles.errorText}>{serviceTypeError}</Text>}

    
</View>
    </ScrollView>
  );
};

export default Shipment1Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3040',
    padding: vh(14)
    
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20
  },
  inputField: {
    paddingHorizontal: vh(6),
    paddingVertical: vh(7),
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4C4C6D'
  },
  attachContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  attachButton: {
    backgroundColor: '#4C516D',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8
  },
  nextButton: {
    backgroundColor: '#72A0C1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
},
toggleLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight:'600'

},
errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
  errorBorder: { borderColor: 'red' },
  white:{
    color:'#ffffff'
  },
  lightMode:{
    backgroundColor:colors.white
  },
  darkMode:{
    backgroundColor: '#2d3040',
  },
});
