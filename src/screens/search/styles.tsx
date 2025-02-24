import { StyleSheet } from 'react-native';
import { vh } from '../../utils/dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EDF3',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  arrowImg: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    color: '#333',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listContain: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  circleText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },
  noresult: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 20,
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
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: vh(25),
    backgroundColor:'#ccc',
    justifyContent: "center",
    alignItems: "center",
  },
  
});

export default styles;
