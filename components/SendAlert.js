import { Alert } from "react-native";

export default SendAlert = (title, msg) => {
  return Alert.alert(title, msg, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};
