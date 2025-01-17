import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
  topView: {
    height: '45%',
  },
  banner: {
    height: '100%',
    width: '100%',

    borderBottomStartRadius: vh(15),
    borderBottomEndRadius: vh(15),
  },
  transparentView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.4)',
    // justifyContent: 'center',
    // alignItems: 'center',
    
    // borderBottomStartRadius: vh(15),
    // borderBottomEndRadius: vh(15),
  },
  searchBox: {
    
    height: vh(60),

    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: vh(10),
  },
  placeholder: {
    marginLeft: 15,
    fontSize: vh(16),
    color: '#9e9e9e',
  },
  logo: {
    fontSize: vh(30),
    color: 'white',
    // position: 'absolute',
    // top: 60,
    // left: 20,
    marginTop:vh(35),
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  cookText: {
    fontSize: vh(20),
    color: '#E6E6E6',
    // position: 'absolute',
    // top: 95,
    // left: 20,
    fontWeight: '500',
  },
  searchRecipe: {
    fontSize: vh(17),
    color: 'white',

    alignSelf: 'center',
    marginTop: vh(10),
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  margin:{
    marginHorizontal:vw(15)
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  
    
})