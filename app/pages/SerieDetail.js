import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GenresGroup from "../components/GenresGroup";

export default function SerieDetail(props) {
  const serie = props.route.params.item;
  const [trailers, setTrailers] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [realisation, setRealisation] = useState();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        serie.id +
        "?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setDetails(responseJson);
        setRealisation(responseJson.created_by[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [details, trailers]);

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
            uri: "https://image.tmdb.org/t/p/w500" + serie.backdrop_path,
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
              <Text style={styles.title}>{serie.name}</Text>
              <Text>Premier épsode : {details.first_air_date}</Text>
              {realisation && <Text>Créer par {realisation} </Text>}
              <Text>Nombre épisode : {details.episode_run_time}</Text>
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
                  serie.vote_average > 5 ? { color: "green" } : { color: "red" }
                }
              >
                {serie.vote_average}
              </Text>
            </View>
          </View>
          <View style={{ flexWrap: "wrap" }}>
            {/* <GenresGroup data={serie.genres} /> */}
            {details.genres && <GenresGroup data={details.genres} />}
          </View>

          <Text style={styles.header}>Résumé</Text>
          <Text>{serie.overview}</Text>
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
