import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import QuantityButtons from "../components/QuantityButtons";
import PickupFooter from "../components/PickupFooter";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { clearCart } from "../CartReducer";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
  const route = useRoute();
  const navigation = useNavigation();
  let {pickupDate,selectedTime,no_of_days} = route.params;
  pickupDate = new Date(pickupDate).toLocaleDateString()
  const dispatch = useDispatch();
    const userId = auth.currentUser.uid;

  const placeOrder = async () => {
    navigation.navigate("order");
    dispatch(clearCart());
    await setDoc(doc(db, "users", `${userId}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      { merge: true }
    );
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView style={{ marginTop: 0 }}>
          {total === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
            </View>
          ) : (
            <>
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
                <Text>Your Cart</Text>
              </View>

              <Pressable
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  marginLeft: 10,
                  marginRight: 10,
                  padding: 14,
                }}
              >
                {cart.map((item, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 12,
                    }}
                    key={index}
                  >
                    <Text
                      style={{ width: 100, fontSize: 16, fontWeight: "500" }}
                    >
                      {item.name}
                    </Text>

                    {/* - + button */}
                    <QuantityButtons item={item} />

                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      ${item.price * item.quantity}
                    </Text>
                  </View>
                ))}
              </Pressable>

              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}
                >
                  Billing Details
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 7,
                    padding: 10,
                    marginTop: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                    >
                      Item Total
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      ₹{total}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                    >
                      Delivery Fee | 1.2KM
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: "#088F8F",
                      }}
                    >
                      FREE
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                    >
                      Free Delivery on Your order
                    </Text>
                  </View>

                  <View
                    style={{
                      borderColor: "gray",
                      height: 1,
                      borderWidth: 0.5,
                      marginTop: 10,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                    >
                      selected Date
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: "#088F8F",
                      }}
                    >
                      {pickupDate}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                    >
                      No Of Days
                    </Text>

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: "#088F8F",
                      }}
                    >
                      {no_of_days}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                    >
                      selected Pick Up Time
                    </Text>

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: "#088F8F",
                      }}
                    >
                      {selectedTime}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: "gray",
                      height: 1,
                      borderWidth: 0.5,
                      marginTop: 10,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 8,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      To Pay
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {total + 95}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <PickupFooter title="Place Order" handlePress={placeOrder} />
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});