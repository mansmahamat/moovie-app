import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function GenresGroup({data}) {
    return (
        <View style={styles.genresContainer} >
                {data.map((item, index) => {
                    return (
                        <View style={styles.genresItem} key={index} >
                            <Text style={{color: "white", fontSize: 15}}>
                                {item}
                            </Text>
                        </View>
                    ) 
                })}
        
        </View>
    )
}

const styles = StyleSheet.create({
    genresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 35
    },
    genresItem : {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#333",
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 19,
    }
})
