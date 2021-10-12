import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import YoutubePlayer from "react-native-youtube-iframe";
import GenresGroup from "../components/GenresGroup";
import TrailersItems from "../components/TrailersItems";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieDetail(props) {
  const movie = props.route.params.item;
  const [trailers, setTrailers] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [theArray, setTheArray] = useState();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movie.id +
        "/videos?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setTrailers(responseJson.results);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movie.id +
        "?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setDetails(responseJson.genres);
        console.log(responseJson.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const storeData = async (value) => {
    try {
      const data = await AsyncStorage.getItem("@storage_Key");

      const arr = JSON.parse(data)
      arr.push(value)
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(arr))
    } catch (e) {
      // saving error
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",

            backgroundColor: "#000",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 48,
              height: 48,
              position: "absolute",
              top: Constants.statusBarHeight + 10,
              left: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={42} color="black" />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ width: "100%" }}>
            <YoutubePlayer height={300} play={true} videoId={"MbGw8Q9Hz6Q"} />
          </View>
        </View>
      </Modal>
      <ScrollView>
        <TouchableWithoutFeedback>
          <MaterialCommunityIcons
            onPress={() => props.navigation.pop()}
            style={{
              position: "absolute",
              top: Constants.statusBarHeight + 10,
              left: 10,
              zIndex: 1,
              paddingRight: 20,
              paddingBottom: 20,
            }}
            name="chevron-left"
            color={"#fff"}
            size={30}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <MaterialCommunityIcons
            onPress={() => storeData(movie)}
            style={{
              position: "absolute",
              top: Constants.statusBarHeight + 10,
              right: 10,
              zIndex: 1,
              paddingRight: 20,
              paddingBottom: 20,
            }}
            name="heart-outline"
            color={"#fff"}
            size={27}
          />
        </TouchableWithoutFeedback>

        <Image
          resizeMode={"cover"}
          style={styles.cover_image}
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
          }}
        />
        <View style={{ flex: 1, backgroundColor: "pink", padding: 20 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text>{movie.release_date}</Text>
            </View>
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "white",
                borderRadius: 24,
                justifyContent: "center",
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={
                  movie.vote_average > 5 ? { color: "green" } : { color: "red" }
                }
              >
                {movie.vote_average}
              </Text>
            </View>
          </View>
          <View style={{ flexWrap: "wrap" }}>
            {/* <GenresGroup data={movie.genres} /> */}
            <GenresGroup data={details} />
          </View>

          <Text style={styles.header}>Résumé</Text>
          <Text>{movie.overview}</Text>
          <Text style={styles.header}>Trailers</Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {trailers.map((item) => {
              return (
                <TrailersItems
                  image={movie.backdrop_path}
                  key={item.key}
                  item={item}
                  setModalVisible={setModalVisible}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  cover_image: {
    height: 285,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
  },
});
