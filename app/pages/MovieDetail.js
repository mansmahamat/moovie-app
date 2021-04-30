import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GenresGroup from "../components/GenresGroup";
import TrailersItems from "../components/TrailersItems";

export default function MovieDetail(props) {
  const movie = props.route.params.item;
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movie.id +
        "/videos?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=en-US"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setTrailers(responseJson.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
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
            size={24}
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
            <GenresGroup data={movie.genres} />
          </View>

          <Text style={styles.header}>Résumé</Text>
          <Text>{movie.overview}</Text>
          <Text style={styles.header}>Trailers</Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row"}}>
            {trailers.map((item) => {
              return <TrailersItems image={movie.backdrop_path} key={item.key} item={item} />;
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
