import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
    const user = auth.currentUser
    const navigation = useNavigation()

    const Logout =()=>{
        try {
            signOut(auth)
            navigation.replace('login')        
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Your Profile
        </Text>
      </View>
      <Pressable
        onPress={Logout}
        style={{
          width: 100,
          backgroundColor: "#318ce7",
          padding: 10,
          marginTop: 30,
          borderRadius: 7,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({})