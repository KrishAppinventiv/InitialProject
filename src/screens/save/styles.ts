import {StyleSheet} from 'react-native';
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
});
