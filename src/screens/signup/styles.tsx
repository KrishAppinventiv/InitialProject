import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import { vh, vw } from '../../utils/dimension';

export default StyleSheet.create({
    already: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vh(30),
      },
      signupColor: {
        color: 'colors.yellowisj',
      },
      
      gap: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vh(30),
      },
      container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      img: {
        marginTop: 20,
        height: 42,
        width: 120,
      },
      imageContain: {
        marginTop: 10,
        marginStart: 30,
        marginBottom: 40,
      },
      signText: {
        color: colors.black,
        fontSize: 30,
        fontWeight: '700',
      },
    
      welText: {
        color: colors.black,
        fontSize: 23,
        fontWeight: '400',
        fontFamily: 'Poppins',
      },
      blurBackground: {
        opacity: 0.6,
      },
      textContain: {
        marginTop: vh(30),
       
      },
      greyText: {
        color: 'grey',
        marginTop: 10,
        width: 270,
        fontSize: 15,
        fontWeight: '600',
      },
      input: {
        alignItems: 'center',
        padding: 10,
        color: 'black',
      },
      inputContainer: {
        padding: vh(8),
        
        borderRadius: 7,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: vh(18)
       
      },
    
      inputContainer1: {
        padding: 10,
        borderRadius: 7,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        backgroundColor: 'white',
      },
    
      textInputContain: {
       
        marginTop: vh(30),
      
      },
      touch: {
        marginTop: vh(15),
        // paddingHorizontal: 130,
        paddingVertical: vh(15),
        backgroundColor: colors.lightBrown,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      text: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
      },
      touchContain: {
        justifyContent: 'center',
        marginHorizontal:vh(40)
      },
    
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
      },
      img2: {
        height: 16,
        width: 16,
        marginEnd: 10,
        alignItems: 'center',
      },
      passwordContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
      signupContainer: {
        flex: 1,
        marginTop: vh(10),
        paddingBottom: vh(40),
        marginBottom: vh(10),
        marginHorizontal: vw(25),
      },
      errorContain: {
        height: 65,
        width: 350,
        borderRadius: 7,
        marginStart: 35,
        backgroundColor: colors.lightPink,
    
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
      },
      redText: {
        color: 'black',
        padding: 10,
        fontSize: 13,
        fontWeight: '400',
      },
      forget: {
        marginStart: 39,
        marginTop: 25,
        marginBottom: 25,
      },
      forgetText: {
        color:colors.darkYellow,
        fontWeight: '600',
      },
    
      content: {
        marginStart: 50,
        marginTop: 20,
      },
    
      instructionText: {
        paddingHorizontal: 12,
        color: 'grey',
        fontSize: 12,
      },
      instruction: {
        marginTop: 17,
        marginBottom: 10,
      },
      google: {
        height: vh(28),
        width: vw(28),
        marginRight: vw(6),
      },
      googleView: {
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: colors.thickGrey,
        shadowOpacity: 5,
        shadowRadius: 3,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
      },
      otherOption: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: vh(20),
      },
    
      option: {
        marginHorizontal: 10,
        color: colors.thinestGrey,
      },
      footerView: {
        height: 1,
        width: 30,
        backgroundColor: colors.thinestGrey,
        alignSelf: 'center',
      },
      footerContain: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vh(20),
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      calendarContainer: {
        position: 'absolute',
        // bottom: vh(10), 
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderRadius: 15,
        elevation: 10,
        zIndex: 1000, 
        padding: vh(10),
        
        marginHorizontal: vw(20),
        marginTop: vh(10),
      },
      lightMode:{
        backgroundColor:colors.white
      },
      darkMode:{
        backgroundColor:colors.dark
      },
      inputField: {
        paddingHorizontal: vh(8),
        paddingVertical:vh(7),
        marginVertical: vh(6),
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.lightGrey,
        color: colors.white,
        marginTop:vh(10)
      },
      white:{
        color:colors.white
      },
      black:{
      color:colors.black
      }
})