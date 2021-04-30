import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import {useNavigation} from '@react-navigation/native';

export default function MovieItems({item}) {

    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('MovieDetail', { item: item})} >
            <View style={styles.list}>
            <Image style={styles.cover_image} source={{uri : "https://image.tmdb.org/t/p/w500" + item.backdrop_path}} />
            <Text style={{width: 171}}>{item.title}</Text>
        </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginRight: 10
    },
    cover_image : {
        width: 171,
        height: 256,
        borderRadius: 10,
        marginBottom: 10
    }
})