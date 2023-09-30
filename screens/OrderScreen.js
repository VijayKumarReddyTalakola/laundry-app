import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

const OrderScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LottieView
        autoPlay
        loop={false}
        speed={0.7}
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 10,
          justifyContent: "center",
        }}
      />
      <Text
        style={{
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
          marginTop: 30,
        }}
      >
        Your Order is Placed Successfully
      </Text>
      <LottieView
        autoPlay
        loop={false}
        speed={0.7}
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          width: 300,
          top: 100,
          position: "absolute",
          alignSelf: "center",
        }}
      />
      <Pressable onPress={() => navigation.navigate("home")}>
        <Text style={{  fontSize: 20, fontWeight: "700", color: "gray" ,textAlign:'center',marginTop:5}}>
          Back to Home
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
