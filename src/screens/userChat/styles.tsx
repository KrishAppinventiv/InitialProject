import {StyleSheet} from 'react-native';
import { vh } from '../../utils/dimension';
import { colors } from '../../theme';


export default StyleSheet.create({
  noresult: {
    textAlign: 'center',
    marginTop: 20,
  },
 
  
  searchInput:{
   color:colors.black
  },

  head: {
    flexDirection: 'row',
    alignItems:'center',
    margin:vh(15),
   
  },
  container: {
    flex: 1,
    backgroundColor: '#E6EDF3',
  },
  searchContain: {
    height:vh(40),
    marginHorizontal:vh(10),
    backgroundColor:colors.white,
    width:"70%",
    borderRadius: 8,
  },
  arrowImg: {
    width: vh(40),
    height: vh(40),
    borderRadius: vh(20),
    borderColor: colors.lightGrey,
    borderWidth: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  introContainers: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    // height: SCREEN_HEIGHT*0.8099,
    backgroundColor: '#F6F9FA',

    // zIndex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
  },

  Contain: {
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E9EE',
    flexDirection: 'row',
    paddingVertical: 25,
  },
  modalText: {
    fontSize: 17,
    marginLeft: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: "#547591",
    fontSize: 14,
    marginTop: 2,
  },
  
  imageMessage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  
  imageText: {
    color: "#666",
    fontSize: 14,
    marginLeft: 4,
  },
  chatDetails: {
    flex: 1,
    marginLeft: vh(10),
  },

  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: vh(3),
    marginTop: vh(5),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatName: {
    fontSize: vh(16),
    fontWeight:'600',
    color:'#214461'
  },
  circleText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },

  avatarText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor:"white",
    marginHorizontal:vh(20),
    borderRadius:vh(20)
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: colors.lightGrey,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  okButton: {
    backgroundColor: 'red',
    padding: 10,
    flex: 1,
  },


  


  unreadMessage: {
    fontWeight: "bold",
    color: "#000",
  },

  unreadBadge: {
    width: 8,
    height: 8,
    backgroundColor: "#FF3B30",
    borderRadius: 4,
    position: "absolute",
    right: 16,
    top: 18,
  },
  hatContainer: {
    flexDirection: 'row',
    padding: vh(10),
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  chatContent: {
    flex: 1,
    marginLeft: vh(10),
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: vh(12),
    color: '#666',
    marginLeft: vh(5),
  },
  
 
});
