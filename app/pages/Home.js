import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import MovieItems from "../components/MovieItems";
import Movie from "../models/Movie";
import Constants from 'expo-constants';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function Home(props) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([])


  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR"
    )
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
      "https://api.themoviedb.org/3/movie/popular?api_key=afd804ef50f1e6b1ad6f29209e9395e6&language=fr-FR&page=1            "
    )
      .then((response) => response.json())
      .then((res) => {
        const allGenres = genres
        setPopularMovies(res.results);
        res.results.forEach((movie) => {
          movie.genres = []
          movie.genre_ids.forEach(genreId =>{
            const genreData = genres.filter(x => x.id == genreId)
            if (genreData != null){
             movie.genres.push(genreData[0].name);
             console.log(movie.genres)
            }
          })
        })
        // setPopularMovies(responseJson.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [genres]);

  return (
    <SafeAreaView
      style={styles.container}
      showHorizontalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          Search
        </Text>
        <MaterialCommunityIcons name="magnify" size={24} />
      </View>
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: "row", flex: 1 , paddingLeft: 20}}>
          {popularMovies.map((item) => {
            return <MovieItems key={item.id} item={item} title={item.title} image={item.poster_path} />;
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
   paddingVertical: 20
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    flex: 1
  }
});
