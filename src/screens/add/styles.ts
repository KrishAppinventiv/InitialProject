import {Keyboard, StyleSheet} from 'react-native';
import {colors} from '../../theme';
import { vh, vw } from '../../utils/dimension';

export default StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 10,
      },
      container: {
        flex: 1,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.navyBlue,
        padding: vh(10),
        paddingTop: vh(14),
       
      },
      backButton: {
        color: colors.white,
        fontSize: 16,
      },
      headerTitle: {
        color: colors.white,
        fontSize: vh(15),
        fontWeight: 'bold',
        marginStart: vh(17),
      },
      footer: {
        backgroundColor: colors.main,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: vh(7),
        marginBottom: vh(50),
        marginTop:vh(0)
      },
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor: colors.dark,
      },
})