import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function RecentMovieItems({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("MovieDetail", { item: item })}
    >
      <View style={styles.list}>
        <Image
          style={styles.cover_image}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ width: 171 }}>{item.title}</Text>
          <Text>
          Sortie : {item.release_date}
          </Text>
          <View style={{flexDirection:"row", flexWrap:"wrap"}}>
            <MaterialCommunityIcons name="star" size={20} />
            <Text>{item.vote_average}</Text>
            <Text style={{alignSelf:"flex-end", fontSize: 12, marginLeft: 5}}>{" "} / 10</Text>
          </View>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cover_image: {
    width: 171,
    height: 256,
    borderRadius: 10,
    marginBottom: 10,
  },
});
