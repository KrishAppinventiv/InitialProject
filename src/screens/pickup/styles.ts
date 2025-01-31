import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import { vh, vw } from '../../utils/dimension';

export default StyleSheet.create({
    container:{
        flex:.8,
        padding: 16,
      
    },
    inputField: {
        paddingHorizontal: vh(8),
        paddingVertical:vh(7),
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.purpleShade,
        color: colors.white,
      },
      errorText: {
        color: 'red',
        fontSize: 12,
      
        marginLeft: 10,
      },
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
        }
})