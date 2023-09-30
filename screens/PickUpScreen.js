import { Pressable, ScrollView, StyleSheet, Text,TextInput } from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import PickupFooter from "../components/PickupFooter";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const PickUpScreen = () => {
  const deliveryTimes = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 AM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "5:00 PM",
    },
  ];

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const startDate = new Date(year, month, day);
  const endDate = new Date(year, month + 1, day);
  const initialSelectedDate = new Date(year, month, day + 2);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState([]);
  const navigation = useNavigation()

  const proceedToCart = () => {
    if(!selectedTime[0] || !deliveryTime[0] || selectedDate===''){
      Alert.alert("Empty or invalid", "Please fill all the fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if(selectedDate!=='' && selectedTime[0] && deliveryTime[0]){
      navigation.replace("cart", {
        selectedTime: selectedTime,
        no_of_days: deliveryTime,
        pickupDate: selectedDate.toISOString(),
      });
    }
  }
  return (
    <>
      <SafeAreaView style={{ marginTop: 20, padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
          Enter Address
        </Text>
        <TextInput
          multiline
          numberOfLines={8}
          style={{
            paddingTop: 0,
            paddingHorizontal: 10,
            borderColor: "gray",
            borderWidth: 0.7,
            borderRadius: 9,
            margin: 5,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: "20" }}>
          Pick Up Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={startDate}
          endDate={endDate}
          initialSelectedDate={initialSelectedDate}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: "20" }}>
          Select Time
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {times.map((item, index) => (
            <Pressable
              onPress={() => setSelectedTime(item.time)}
              key={index}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{ fontSize: 16, fontWeight: 500, marginHorizontal: "20" }}>
          Delivery Period
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTimes.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setDeliveryTime(item.name)}
              style={
                deliveryTime.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
      <PickupFooter title="Proceed to Cart" handlePress={proceedToCart} />
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
