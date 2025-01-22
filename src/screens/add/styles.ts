import {Keyboard, StyleSheet} from 'react-native';
import {colors, dimension} from '../../theme';
import { vh, vw } from '../../utils/dimension';

export default StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 10,
      },
      container: {
        flex: 1,
        // backgroundColor: '#2d3040',
        
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#323E47',
        padding: vh(10),
        paddingTop: vh(14),
       
      },
      backButton: {
        color: '#ffffff',
        fontSize: 16,
      },
      headerTitle: {
        color: '#ffffff',
        fontSize: vh(15),
        fontWeight: 'bold',
        marginStart: vh(17)
      },
      footer: {
        backgroundColor: '#72A0C1',
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: vh(20),
      },
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor: '#2d3040',
      },
})