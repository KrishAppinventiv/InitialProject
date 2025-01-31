import {StyleSheet} from 'react-native';

import {colors} from '../../theme';
import { vh, vw } from '../../utils/dimension';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
        padding: vh(14)
        
      },
      heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 20
      },
      inputField: {
        paddingHorizontal: vh(6),
        paddingVertical: vh(7),
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.purpleShade
      },
      attachContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
      },
      attachButton: {
        backgroundColor: colors.lightPurple,
        padding: 12,
        borderRadius: 8,
        marginLeft: 8
      },
      nextButton: {
        backgroundColor: colors.main,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
      },
      nextButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:colors.white
      },
      toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    toggleLabel: {
        color:colors.white,
        fontSize: 16,
        fontWeight:'600'
    
    },
    errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
      errorBorder: { borderColor: 'red' },
      white:{
        color:colors.white
      },
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor: colors.dark,
      },
      black:{
        color:colors.black
        },
        modalContent: {
            width: '80%',
            backgroundColor: colors.white,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5, 
          },
          modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
            color: colors.black
          },
          closeButton: {
            marginTop: 20,
            backgroundColor: colors.lighterBlue,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          },
          closeButtonText: {
            color: colors.white,
            fontSize: 16,
            fontWeight: '600',
          },
          picker: {
            height: vh(60),
            width: '60%'
          },
})