import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
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
      black:{
        color:'#000'
        },
        modalContent: {
            width: '80%',
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5, 
          },
          modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
            color: '#333',
          },
          closeButton: {
            marginTop: 20,
            backgroundColor: '#007bff',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          },
          closeButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          },
          picker: {
            height: vh(60),
            width: '60%'
          },
})