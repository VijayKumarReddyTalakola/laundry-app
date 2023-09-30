import { Pressable, StyleSheet, Text } from 'react-native'
import { decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';
import { useDispatch } from 'react-redux';

const QuantityButtons = ({item}) => {
    const dispatch = useDispatch()
  return (
    <Pressable
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Pressable
        onPress={() => {
          dispatch(decrementQuantity(item));
          dispatch(decrementQty(item));
        }}
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          borderColor: "#bebebe",
          backgroundColor: "#e0e0e0",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#088f8f",
            paddingBottom: 8,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          -
        </Text>
      </Pressable>
      <Pressable>
        <Text
          style={{
            fontSize: 19,
            color: "#088f8f",
            paddingHorizontal: 8,
            fontWeight: "600",
          }}
        >
          {item.quantity}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch(incrementQuantity(item));
          dispatch(incrementQty(item));
        }}
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          borderColor: "#bebebe",
          backgroundColor: "#e0e0e0",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#088f8f",
            paddingLeft: 1,
            paddingTop: -30,
            paddingBottom: 6,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          +
        </Text>
      </Pressable>
    </Pressable>
  );
}

export default QuantityButtons

const styles = StyleSheet.create({})