import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import MovieItems from "../components/MovieItems";
import SeriesItems from "../components/SeriesItems";
import Movie from "../models/Movie";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RecentMovieItems from "../components/RecentMovieItems";

export default function Home(props) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [series, setSeries] = useState([]);
  const [recentsMovies, setRecentsMovies] = useState([]);

  

  const api_key = "afd804ef50f1e6b1ad6f29209e9395e6";
  const base_url = "https://api.themoviedb.org/3/genre/movie/";

  
  

  useEffect(() => {
    fetch(base_url + "list?api_key=" + api_key + "&language=fr-FR")
      .then((response) => response.json())
      .then((res) => {
        setGenres(res.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR&page=1            "
    )
      .then((response) => response.json())
      .then((res) => {
        setPopularMovies(res.results);

        fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR&page=1"
        )
          .then((response) => response.json())
          .then((res) => {
            setRecentsMovies(res.results);
          })
          .catch((err) => {
            console.log(err);
          });

        fetch(
          "https://api.themoviedb.org/3/tv/popular?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR&page=1"
        )
          .then((response) => response.json())
          .then((res) => {
            setSeries(res.results);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      }, []);
  }, [genres]);

  

  return (
    <SafeAreaView
      style={styles.container}
      showHorizontalScrollIndicator={false}
    >
   

      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>

        <MaterialCommunityIcons name="magnify" size={24} />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text>Popular movie</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text>View all</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
            {popularMovies.map((item, index) => {
              return index < 10 ? (
                <MovieItems
                  key={item.id}
                  item={item}
                  title={item.title}
                  image={item.poster_path}
                />
              ) : (
                <View key={item.id} />
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text>Popular Séries</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text>View all</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20 }}>
            {series.map((item, index) => {
              return index < 10 ? (
                <SeriesItems
                  key={item.id}
                  item={item}
                  title={item.title}
                  image={item.poster_path}
                />
              ) : (
                <View key={item.id} />
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
            marginTop: 20,
          }}
        >
          <Text>Recent movie</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text>View all</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {recentsMovies.map((item, index) => {
            return index < 10 ? (
              <RecentMovieItems
                key={item.id}
                item={item}
                title={item.title}
                image={item.poster_path}
              />
            ) : (
              <View key={item.id} />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingVertical: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    flex: 1,
  },
});
