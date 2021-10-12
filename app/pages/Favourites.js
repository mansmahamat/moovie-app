import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'

export default function Favourites() {
    const [film, setFilm] = useState([]);

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@storage_Key");
    
          setFilm(JSON.parse(jsonValue));
          console.log(jsonValue);
        } catch (e) {
          // error reading value
        }
      };
    
      const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
      }

      useEffect(() => {
        getData();
        
      }, []);


    return (
        <SafeAreaView
        style={styles.container}
        showHorizontalScrollIndicator={false}
      >
        <View>
            <Text>
              s  {
                    film.id
                }
            </Text>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})
