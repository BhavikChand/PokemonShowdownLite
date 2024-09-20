import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState, useEffect } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Dimensions, Image, Text, StyleSheet, ScrollView } from "react-native";
import {getPokemonWithMoves } from '@/components/db-functions/db-functions';
import getPokemonFrontImage from "@/components/PokeImgUtil";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export function TeamDetails({ route, navigation }) {
    let { teamId } = route.params;
    const [pokemonInfo, setPokemonInfo] = useState([]);
    useEffect(() => {
        if (typeof (teamId) !== 'undefined') {
            loadPokemonInfo(teamId);
        }
    }, [teamId]);
    const loadPokemonInfo = async (teamId) => {
        try {
            const info = await getPokemonWithMoves(teamId);
            setPokemonInfo(info);
        } catch (error) {
            console.error('Error loading Pokemon info:', error);
        }
    };
    if (typeof (teamId) == 'undefined') {
        return (
            <ThemedView style={styles.teamcontainer}>
                <ThemedText>Error</ThemedText>
            </ThemedView>
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {pokemonInfo.map((pokemon, index) => (
                <View style={styles.teamcontainer} key={index}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={ getPokemonFrontImage(pokemon.pokemon_id)}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.pokeName}>
                            <Text style={styles.pokeNameText}>{pokemon.pokemon_name}</Text>
                        </View>
                        {/* creates the the moves view with their repective move name */}
                        <View style={styles.moveContainer}>
                            {pokemon.moves.slice(0,4).map((move, moveIndex) => (
                                <View style={styles.move1} key={moveIndex}>
                                    <Text style={styles.pokeMoveText}>{move.move_name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    teamcontainer: {
        width: '98%',
        height: screenHeight * 0.19,
        marginHorizontal: '1%',
        backgroundColor: '#4D4A44',  // Main container color
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        borderRadius: 15,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight:10
    },
    image: {
        width: 150, // Set the width of the image
        height: 150, // Set the height of the image
        resizeMode: 'contain', // Adjust the image scaling (cover, contain, etc.)
      },
    imgContainer: {
        width: '40%',
        height: '90%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 15,
        backgroundColor: 'tan',  // Blue background for imgContainer
    },
    infoContainer: {
        width: '50%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#de333c',  // Green background for infoContainer
    },
    pokeName: {
        width: 'auto',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 10,
    },
    pokeNameText: {
        fontSize: 20,  // Adjust this to change the font size
        fontWeight: 'bold',
        color: 'black',
    },
    pokeMoveText: {
        fontSize: 13,  // Adjust this to change the font size
        fontWeight: 'bold',
        color: 'white',
    },
    moveContainer: {
        width: '100%',
        height: '70%',
        flexDirection: 'row',         // Row direction to place items horizontally
        flexWrap: 'wrap',             // Allows items to wrap to the next line
        justifyContent: 'center',     // Center the items in the grid
        alignItems: 'center',         // Center items vertically within each row
        borderRadius: 15,
        marginTop: 5,
        marginRight:7,
        marginBottom: 5
    },
    move1:{
        width: '45%',
        height: '45%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 22,
        marginTop:5,
        marginLeft: 6,
        backgroundColor: 'grey',
    }
});

