import {StyleSheet} from 'react-native';
import { vh } from '../../utils/dimension';
import { colors } from '../../theme';


export default StyleSheet.create({
    
    mainContain: {
    backgroundColor: 'white',
    flex:0.13,
    justifyContent:'center',
  },
  flexrow: {
    flexDirection:'row',
  },
  blackContain: {
    flexDirection: 'row',
    marginTop:vh(10),
    marginHorizontal:vh(10),
    justifyContent:'space-between',
  },
  blackbt: {
    height:30,
    width:30,
    marginTop:10,
    marginRight:20,
  },
  profContain: {
    width: vh(45),
    height: vh(45),
    borderRadius: vh(23),
    backgroundColor: '#2A7BBB',
    justifyContent: 'center',
    alignContent: 'center',
    marginStart:vh(15)
  },
  profIcon: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  userContain: {
    marginTop:vh(5),
  },
  username: {
    fontSize: vh(16),
    marginLeft:10,
    fontWeight:'600'
  },
  clockText: {
    fontSize: 13,
    marginTop:vh(3),
    marginLeft:10,
    color:'#b8bdc2',
  },
  options: {
    height:22,
    width:22,
    marginTop:10,
    marginRight:20,
  },
  giftContaim: {
    paddingBottom: 40,
    flex: 0.85,
  },
  container: {
    flex: 1,
    backgroundColor: '#E6EDF3',
   
  },
  arrowImg: {
    width: vh(40),
    height: vh(40),
    borderRadius: vh(20),
    borderColor: colors.lightGrey,
    borderWidth: 2,
  },

})