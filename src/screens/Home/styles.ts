import { StyleSheet } from 'react-native';
import { vh, vw } from '../../utils/dimension';
import { colors } from '../../theme';

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
  },
  searchBox: {
    paddingVertical:vh(10),
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
    color:colors.darkGrey
  },
  logo: {
    fontSize: vh(30),
    color: 'white',
    marginTop:vh(35),
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  cookText: {
    fontSize: vh(20),
    color: colors.lightGrey,
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
   backgroundColor:colors.dark
  },
  chatButton: {
    position: 'absolute',
    top: 10,  
    right: 15,
    backgroundColor: colors.lightGrey,
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6, 
   
  },
  
    
})