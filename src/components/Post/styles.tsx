import { StyleSheet } from 'react-native';
import { vh, vw } from '../../utils/dimension';
import { colors } from '../../theme';

export default StyleSheet.create({
    postContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },
      profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      username: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      postImage: {
        width: '100%',
        height: 300,
        
      },
      caption: {
        padding: 10,
        fontSize: 14,
        color: '#333',
      },
      likeButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#f0f0f0',
        flexDirection:'row'
      },
      likeButtonText: {
        fontSize: 16,
        color: '#333',
      },
      footer: {
        padding: 10,
        alignItems: 'center',
      },
      likeText:{
        marginLeft:vh(10),
        fontSize:vh(16)
      }
})