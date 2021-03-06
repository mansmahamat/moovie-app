import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const imageWidth = (deviceWidth - 60) / 2;
const leftPlay = (imageWidth- 44) / 2;

export default function TrailersItems(props) {
  return (
    <TouchableWithoutFeedback onPress={() => props.setModalVisible(true)}>
      <View style={{ marginRight: 3 }}>
      <Image
        style={{
          position: "absolute",
          top: 30,
          left: leftPlay,
          zIndex: 1,
          width: 42,
          height: 42,
        }}
        source={require("../assets/play.png")}
      />
      <Image
        resizeMode={"cover"}
        style={styles.images}
        source={{
          uri: "https://image.tmdb.org/t/p/w342" + props.image,
        }}
      />
      <Text style={{ flexWrap: "wrap", width: 171 }}>{props.item.name}</Text>
    </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  images: {
    height: 100,
    width: imageWidth,
    borderRadius: 21,
    marginBottom: 7
  },
});
