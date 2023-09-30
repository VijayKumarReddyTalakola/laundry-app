import { StyleSheet, Text, View ,ScrollView, Pressable, Image} from 'react-native'
const services = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
    name: "Washing",
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
    name: "Laundry",
  },
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
    name: "Wash & Iron",
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
    name: "Cleaning",
  },
];

const Services = () => {
  return (
    <View style={{paddingVertical:10}}>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((service) =>(
                <Pressable key={service.id} style={{margin:7,backgroundColor:"white",padding:20,borderRadius:7}}>
                    <Image source={{uri : service.image}} style={{width:70,height:70,resizeMode:"contain"}} />
                    <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})