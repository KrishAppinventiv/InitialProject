import {Keyboard, StyleSheet} from 'react-native';
import {colors} from '../../theme';
import {vh, vw} from '../../utils/dimension';

export default StyleSheet.create({
  modalImage: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    opacity: 0.8,
  },
  ResendText: {
    color: colors.darkestBlue,
    fontWeight: '600',
    fontSize: 14,
  },
  Resend: {
    marginTop: 20,
    marginBottom: 25,
    flexDirection: 'row-reverse',
    marginEnd: 45,
  },
  partition: {
    height: 28,
    width: 2,
    backgroundColor: colors.lightestGrey,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textContainer: {
    marginStart: 25,
    marginTop: 60,
  },
  headText: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: '700',
  },
  greyText: {
    color: colors.greyBlue,

    fontSize: 15,
    fontWeight: '400',
  },
  numberContain: {
    height: 40,
    width: 240,
    borderRadius: 7,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 25,

    padding: 10,
    flexDirection: 'row',

    marginLeft: 20,
  },

  ccpContain: {
    height: vh(50),
    width: vw(50),
    borderRadius: 7,
    borderColor: colors.lightestGrey,
    borderWidth: 1,

    backgroundColor: 'white',

    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh(30),
  },
  input: {
    alignItems: 'center',
    marginLeft: 20,
    color: 'black',
  },

  touch: {
    marginTop: vh(35),
    backgroundColor: colors.main,
    borderRadius: vh(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.lighterGrey,
    shadowOpacity: 5,
    shadowRadius: 3,
    elevation: 2,
    marginHorizontal: vh(40),
  },

  text: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  touchContain: {
    marginTop: vh(50),
    marginHorizontal: vh(20),
  },

  greyContain: {
    marginTop: vh(20),
    marginStart: vh(20),
    width: vh(40),
    height: vh(40),
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vh(20),
  },
  countryCodeText: {
    alignItems: 'center',

    color: 'black',
  },

  arrowImg: {
    width: vh(40),
    height: vh(40),
    borderRadius: vh(20),
    marginTop: vh(40),
    marginStart: vh(10),
    borderColor: colors.lightGrey,
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',

    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalheading: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 15,
    fontWeight: '700',
    lineHeight: 26,
  },

  modalText1: {
    marginHorizontal: 35,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '300',
    alignSelf: 'center',
    justifyContent: 'center',
    color: colors.purple,
    lineHeight: 19.5,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  containerThree: {
    flexDirection: 'row',
    // borderWidth:1,
    backgroundColor: colors.lightGreen,
    marginTop: 20,
    height: 60,
    padding: 15,
  },
  color: {
    color: 'white',
  },
  dontView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh(30),
  },
  signupColor: {
    color: colors.main,
  },
  alertImg: {
    marginTop: 10,
    marginRight: 10,
  },
  keyboard: {
    flex: 1,
  },
  darkMode: {
    backgroundColor: colors.dark,
  },
  lightMode: {
    backgroundColor: colors.white,
  },
});
