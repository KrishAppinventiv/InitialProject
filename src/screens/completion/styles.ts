import {Platform, StyleSheet} from 'react-native';
import { colors } from '../../theme';
import { vh, vw } from '../../utils/dimension';




export default StyleSheet.create({
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
        borderColor: colors.purpleShade,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
       marginBottom:vh(20)
      },
      checkboxLabel: {
        color: colors.white,
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
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
      },
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor: colors.dark,
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
      },
      errorBorder: {
        borderColor: 'red',
      },
      white:{
        color:colors.white
      },
      black:{
      color:colors.black
      },
      footer: {
        backgroundColor: colors.main,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: vh(20),
      },
})