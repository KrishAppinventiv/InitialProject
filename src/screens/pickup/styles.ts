import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

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
      },
      black:{
        color:'#000'
        }
})