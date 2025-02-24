import {StyleSheet} from 'react-native';
import { vh } from '../../utils/dimension';
const clr1 = "mediumseagreen";
export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  btn: {
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: "3%",
    width: "50%",
    borderWidth: 2,
    borderColor: clr1,
  },
  btnText: {
    color: clr1,
  },

  
  icon: {
    marginBottom: 20,
  },
  
  qrCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
   
    marginVertical: 5,
    marginHorizontal:vh(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  qrText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});
