import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import ErrorHandler from "../ErrorHandler";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const Register = async () => {
    if (email === "" || password === "" || phone === "") {
        Alert.alert("Invalid Details", "Please fill all the details", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
    } else {
      try {
        const user = await createUserWithEmailAndPassword(auth,email,password);
        const userId = auth.currentUser.uid;
        await setDoc(doc(db, "users", `${userId}`), {
          email: email,
          phone: phone,
        });
      } catch (error) {
        const err = <ErrorHandler error={error} />;
        Alert.alert("Error", `${err}`, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(error.message);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#662d91" }}>
            Register
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create your account
          </Text>
        </View>
        <View style={{ marginTop: 50, paddingHorizontal: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              inputMode="email"
              value={email}
              onChangeText={(e) => setEmail(e)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 15,
                marginLeft: 15,
              }}
              placeholderTextColor="black"
              placeholder="Email"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              secureTextEntry={true}
              inputMode="text"
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 15,
                marginLeft: 15,
              }}
              placeholderTextColor="black"
              placeholder="Password"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={22} color="black" />
            <TextInput
              inputMode="tel"
              value={phone}
              onChangeText={(e) => setPhone(e)}
              style={{
                fontSize: phone ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 15,
                marginLeft: 15,
              }}
              placeholderTextColor="black"
              placeholder="Phone No"
            />
          </View>
          <Pressable
            onPress={Register}
            style={{
              width: 200,
              backgroundColor: "#318ce7",
              padding: 12,
              marginTop: 40,
              borderRadius: 7,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("login")}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
