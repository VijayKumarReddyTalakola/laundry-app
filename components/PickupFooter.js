import { StyleSheet, Text, View ,Pressable} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PickupFooter = ({title,handlePress}) => {  
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
  return (
    <>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088f8f",
            padding: 10,
            marginTop: "auto",
            marginBottom: 10,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "white" }}>
              {cart.length === 1 ? (
                <Text>{cart.length} item</Text>
              ) : (
                <Text>{cart.length} items</Text>
              )}
              | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "white",
                marginVertical: 5,
              }}
            >
              Extra charges may apply
            </Text>
          </View>
          <Pressable onPress={handlePress}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {title}
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
}

export default PickupFooter

const styles = StyleSheet.create({})