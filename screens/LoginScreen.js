import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput,} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ActivityIndicator } from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoading(false);
      } else {
        navigation.navigate("home");
      }
    });
    return () => unsubscribe();
  }, []);

  const Login = async () => {
    if (email === "" || password === "") {
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
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (!user) {
          Alert.alert("User Not Found", `Enter valid credentials`, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          console.log(`User not found`);
        }
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
      {loading ? (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          size="large"
          color="gray"
        />
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#662d91" }}
            >
              Sign In
            </Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
              Sign In to your account
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
            <Pressable
              onPress={Login}
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
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 18 }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("register")}
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
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
