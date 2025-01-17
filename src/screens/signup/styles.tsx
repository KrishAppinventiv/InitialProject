import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    already: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vh(30),
      },
      signupColor: {
        color: '#FF9C00',
      },
      
      gap: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vh(30),
      },
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        color: '#000000',
        fontSize: 30,
        fontWeight: '700',
      },
    
      welText: {
        color: '#000000',
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
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: vh(18),
       
      },
    
      inputContainer1: {
        padding: 10,
       
        borderRadius: 7,
        borderColor: '#ccc',
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
        backgroundColor: '#129575',
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
        backgroundColor: '#ffe8e7',
    
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
        color: '#FFAD30',
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
        shadowColor: '#C3C3C3',
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
        color: '#c7c7c7',
      },
      footerView: {
        height: 1,
        width: 30,
        backgroundColor: '#c7c7c7',
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
        backgroundColor:'#2d3040'
      },
      inputField: {
        paddingHorizontal: vh(8),
        paddingVertical:vh(7),
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        color: '#fff',
        marginTop:vh(10)
      },
})