import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../CartReducer";
import { incrementQty } from "../ProductReducer";
import QuantityButtons from "./QuantityButtons";

const Product = ({ item }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementQty(item));
  };

  return (
    <View style={{ padding: 0 }}>
      <Pressable
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 7,
        }}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 70, height: 70, resizeMode: "contain" }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 83,
              fontSize: 17,
              fontWeight: "500",
              marginBottom: 7,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ width: 60, color: "gray", fontSize: 15 }}>
            ${item.price}
          </Text>
        </View>
        {cart.some((c) => c.id === item.id) ? (
          <QuantityButtons item={item}/>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderWidth: 0.8,
                borderRadius: 4,
                marginVertical: 10,
                color: "#088f8f",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});