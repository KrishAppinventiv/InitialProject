import {Platform, StyleSheet} from 'react-native';
import { colors } from '../../theme';
import { vh, vw } from '../../theme/dimensions';



export default StyleSheet.create({
    head: {
        color: '#ffffff',
        fontSize: vh(15),
        fontWeight: '500'
      },
      container: {
       
        flex: 1,
        padding: vh(10)
      },
      checkbox: {
        padding: 10
      },
      leftText: {
        marginLeft: 10,
        fontSize: vh(13),
        color: '#ffffff',
        fontWeight: '500',
      },
      checkedText: {
        fontWeight: '600',
        color: colors.main,
      },
      checkedBox: {
        width: 24,
        height: 24,
        backgroundColor: colors.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      tick: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      uncheckedBox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#A8A8A8',
        backgroundColor: '#fff',
        borderRadius: 5,
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: vh(2),
      },
      radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 45,
        marginTop:vh(10)
      },
      radioButton: {
        height: 20,
        width: 20,
        // backgroundColor:colors.main,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.main,
        alignItems: "center",
        justifyContent: "center"
      },
      radioButtonIcon: {
        height: 10,
        width: 10,
        borderRadius: 7,
        backgroundColor: colors.main
      },
    
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor: '#2d3040',
      },
      
})