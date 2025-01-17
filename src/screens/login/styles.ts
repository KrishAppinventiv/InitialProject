import {Platform, StyleSheet} from 'react-native';
import { colors } from '../../theme';
import { vh, vw } from '../../theme/dimensions';



export default StyleSheet.create({
    ImgBg: {
        flex: 1,
      },
      headView: {
        marginHorizontal: vw(20),
        marginTop: vh(25),
        // backgroundColor:'red'
      },
      wlcmText: {
        fontSize: vh(18),
        fontWeight:'600',
       
      },
      grey: {
        marginTop: vh(20),
        lineHeight: vh(20),
        fontSize: vh(15),
        fontWeight: '600',
        color: colors.grey,
      },
      numberView: {
        height: '27%',
        backgroundColor: colors.white,
        marginTop: vh(20),
        flexDirection: 'row',
        borderRadius: vh(10),
        borderWidth: 2,
        borderColor: '#E8E8E8',
        alignItems: 'center',
        paddingHorizontal: vh(20),
      
      },
      container: {
        flex: 1,
      },
      modalView: {
        width: '100%',
        height: '55%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopEndRadius: vh(20),
        borderTopStartRadius: vh(20),
      },
      ccpContain: {
        flexDirection: 'row',
    
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        flexDirection: 'row',
        marginHorizontal: vh(5),
       
      },
      input: {
        width: vw(150),
        
        alignItems: 'center',
        marginLeft: vw(2),
        color: 'black',
      },
    
      numberContain: {
        borderRadius: 7,
        backgroundColor: 'white',
        flexDirection: 'row',
      },
      countryCodeText: {
        color: 'black',
      },
     flagText: {
        marginRight:vh(3)
      },
      touch: {
        marginHorizontal: vh(40),
        borderRadius: vh(10),
        marginBottom: vh(10),
        shadowColor: '#F0F0F0',
        shadowOpacity: 5,
        shadowRadius: 3,
        elevation: 2,
      },
      dontView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vh(17),
      },
      signupColor: {
        color: colors.main,
      },
      floatingLabel: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? -vh(10) : -vh(3),
        fontSize: vh(9),
        fontWeight: '600',
        color: colors.main,
      },
      darkMode:{
        backgroundColor:'#000000'
      },
      lightMode:{
        backgroundColor:colors.white
      },
      otherOption: {
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      googleView: {
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#C3C3C3',
        shadowOpacity: 5,
        shadowRadius: 3,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: vh(10),
      },
      google: {
        height: vh(28),
        width: vw(28),
        marginRight: vw(6),
      },
    
})