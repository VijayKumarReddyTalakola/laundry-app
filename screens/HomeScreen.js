import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import Product from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import PickupFooter from "../components/PickupFooter";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
  const product = useSelector((state) => state.product.product);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(
    "We are loading your location"
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    if (product?.length > 0) return ;
    const fetchProducts = async () => {
      const typesRef = collection(db, "types");
      const docSnap = await getDocs(typesRef);
      docSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items.map((service) =>dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    checkLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    console.log(`Enabled Status:`, enabled);
    if (!enabled) {
      console.log(`Enabled Status for alert:`, !enabled);
      Alert.alert(
        "Location Service is not enabled",
        "Please enable the location service",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location service",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setCurrentAddress(address);
        console.log(`Current Address :`, currentAddress);
      }
    }
  };

  const proceedToPickUp = () => {
    navigation.navigate("pickup");
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#f0f0f0",
          flex: 1,
          marginTop: 20,
          padding: 10,
        }}
      >
        {/* Location and Profile */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="location-on" size={30} color="#fd5c63" />
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
              <Text>{currentAddress}</Text>
            </View>
          </View>
          <Pressable onPress={()=>navigation.navigate('profile')} style={{ marginLeft: "auto", marginRight: 9 }}>
            <Image
              source={{ uri: "https://source.unsplash.com/featured/300x201" }}
              style={{ width: 40, height: 40, borderRadius: 25 }}
            />
          </Pressable>
        </View>
        {/* SearchBar */}
        <View
          style={{
            padding: 7,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items here" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>
        {/* Image Carousel */}
        <Carousel />
        {/* Services */}
        <Services />
        {/* Render All Products */}
        {product.map((item, index) => (
          <Product item={item} key={index} />
        ))}
      </ScrollView>
      <PickupFooter title="Proceed to Pickup" handlePress={proceedToPickUp} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
