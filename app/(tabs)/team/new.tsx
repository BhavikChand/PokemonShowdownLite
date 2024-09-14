import { UserContext } from '@/components/CurrentUser';
import { getPokemonByName, getUserTeam } from '@/components/db-functions/db-functions';
import { Team } from '@/components/db-functions/db-types';
import { TeamBubble } from '@/components/team-view/TeamBubble';
import React, { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityIndicator, StatusBar, StyleSheet, View, Button, TextInput, FlatList, Text, Image } from 'react-native';
import getPokemonImage from '@/components/PokeImgUtil';



export default function NewTeamPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to handle the search
    const handleSearch = async () => {
        setLoading(true);
        try {
            const results = await getPokemonByName(searchTerm);
            setPokemonList(results);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
        setLoading(false);
    };

    // Using DB, create team and add to it. 
    const handleAddToTeam = (pokemonId) => {
        alert(`Pokémon with ID ${pokemonId} added to team!`);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'>Welcome To the team builder</ThemedText>
            </ThemedView>
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchInput, styles.inputText]}
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#00FF00" />
            ) : (
                <FlatList
                    // Take the ID of each of our return values and grab the images from a hardcoded map using ID
                    data={pokemonList}
                    keyExtractor={(item) => item.pokemon_id.toString()}
                    renderItem={({ item }) => {
                        
                        return (
                            <View style={styles.pokemonItem}>
                                <Image
                                    source={getPokemonImage(item.pokemon_id)}  
                                    style={styles.pokemonItem}
                                    resizeMode="contain"
                                />
                                <Text style={styles.inputText}>{item.pokemon_name}</Text>
                                <Button title="View" onPress={() => handleAddToTeam(item.pokemon_id)} />
                            </View>
                        );
                    }}
                />
            )}
        </ThemedView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: '5%',
    },
    titleContainer: {
        marginTop: '10%',
        marginBottom: '5%',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: '10%',
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    pokemonItem: {
        flexDirection: 'row',
        alignItems: 'center', // Centers the items vertically
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    inputText: {
        flex: 1, 
        color: 'white',
        textAlign: 'center', 
    },
    pokemonImage: {
        width: 50,
        height: 50,
    },
    addButton: {
        flex: 1, 
    },
});
