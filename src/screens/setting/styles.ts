import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
      },
      darkContainer: {
        backgroundColor:'#2d3040'
      },
      settingItem: {
        marginBottom: 20,
        shadowColor:'#ccc',
        padding:vh(10),
        elevation:vh(5),
        borderWidth:2,
        backgroundColor:colors.main,
        borderColor:'#ccc',
        borderRadius:vh(20)
      },
      label: {
        fontSize: vh(18),
        marginBottom: 10,
        fontWeight:'600'
      },
      picker: {
        height: 50,
        width: 200
      },
      button:{
        backgroundColor:colors.main,
        borderRadius:vh(20)
      },
      modalContent: {
        padding: 20,
        alignItems: 'center',
        backgroundColor:"white",
        marginHorizontal:vh(20),
        borderRadius:vh(20)
      },
      modalText: {
        fontSize: 18,
        fontWeight:'500'
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        flex: 1,
        marginRight: 10,
      },
      okButton: {
        backgroundColor: 'red',
        padding: 10,
        flex: 1,
      },
})