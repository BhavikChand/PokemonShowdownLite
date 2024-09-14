import { UserContext } from '@/components/CurrentUser';
import { getPokemonByID, getPokemonByName, getUserTeam } from '@/components/db-functions/db-functions';
import React, { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityIndicator, StatusBar, StyleSheet, View, Button, TextInput, FlatList, Text, Image, Modal } from 'react-native';
import getPokemonImage from '@/components/PokeImgUtil';



export default function NewTeamPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null); // Track selected Pokémon

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


    const handleAddToTeamModal = async (pokemonId) => {
        try {
            const pokemonStats = await getPokemonByID(pokemonId); 
            setSelectedPokemon(pokemonStats); 
            setModalVisible(true); // Show the modal
        } catch (error) {
            console.error('Error fetching Pokémon stats:', error);
        }
    };


    const closeModal = () => {
        setSelectedPokemon(null); // Clear selected Pokémon
        setModalVisible(false); // Close modal
    };

    const addToTeam = () => {
        // TODO: Add to some sort of temp team and then go to different screen to add the moves
    }


    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'>Team builder</ThemedText>
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
                                <Button title="View" onPress={() => handleAddToTeamModal(item.pokemon_id)} />
                            </View>
                        );
                    }}
                />
            )}
            {/* Modal for displaying Pokémon details */}
            {selectedPokemon && (
                <Modal
                    visible={isModalVisible}
                    animationType='slide'
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <ThemedText style={styles.modalText} type='title'>{selectedPokemon.pokemon_name}</ThemedText>
                            <Image
                                source={getPokemonImage(selectedPokemon.pokemon_id)}
                                style={styles.pokemonImage}
                                resizeMode="contain"
                            />
                            <ThemedText style={styles.modalText}>HP: {selectedPokemon.hp}</ThemedText>
                            <ThemedText style={styles.modalText}>Attack: {selectedPokemon.attack}</ThemedText>
                            <ThemedText style={styles.modalText}>Defense: {selectedPokemon.defense}</ThemedText>
                            <ThemedText style={styles.modalText}>Special Attack: {selectedPokemon.special_attack}</ThemedText>
                            <ThemedText style={styles.modalText}>Special Defense: {selectedPokemon.special_defense}</ThemedText>
                            <ThemedText style={styles.modalText}>Speed: {selectedPokemon.speed}</ThemedText>
                            <Button title="Add To Team" onPress={addToTeam} />
                            <Button title="Close" onPress={closeModal} />
                        </View>
                    </View>
                </Modal>
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
        alignItems: 'center',
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        color: 'black',
    }
});
