import { UserContext } from '@/components/CurrentUser';
import { getPokemonByID, getPokemonByName, getUserTeam } from '@/components/db-functions/db-functions';
import React, { useState, useEffect, useContext } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityIndicator, StatusBar, StyleSheet, View, Button, TextInput, FlatList, Text, Image, Modal, Pressable } from 'react-native';
import getPokemonFrontImage from '@/components/PokeImgUtil';
import { useNavigation } from '@react-navigation/native';
import { TeamBuilderPokemon, TeamDetailsProps } from '@/components/db-functions/db-types';
import { addTeamToDatabase, fillUpTeam, getAllLearnedMoves, removePokemon } from '@/components/TeamBuilderUtils';

const NewTeamPage: React.FC<TeamDetailsProps> = ({ route, navigation }) => {
    // navigation function
    const navigatior = useNavigation();
    const { username, userId } = useContext(UserContext);
    // page rendering variables
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    // search related variables
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState(null); // Track selected Pokémon
    const [pokemonList, setPokemonList] = useState([]);
    // Team related variables
    const [localTeamName, setTeamName] = useState('');
    const [currentTeam, setCurrentTeam] = useState<TeamBuilderPokemon[]>(route.params.currentTeam);
    const filledTeam = fillUpTeam(currentTeam);

    // Function to handle team name change
    const handleTeamNameChange = (text: string) => {
        if (text.length <= 15) {
            setTeamName(text);
        }
    };
    // Function to handle the search
    const handleSearch = async () => {
        setLoading(true);
        try {
            console.log(`the term is <${searchTerm}>`);
            const results = await getPokemonByName(searchTerm);
            setPokemonList(results);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
        setLoading(false);
    };

    const handleAddToTeamModal = async (pokemonId: number) => {
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

    const tryAddToTeam = async () => {
        // Check what moves this mon can possibly learn, pass into the pokemon detail screen
        if (currentTeam.length >= 6) {
            alert("You Already Have 6 Pokemon! Remove One!");
            console.log(currentTeam.length);
        }
        else {
            // Check the moves that are from gen 1
            let response = await getAllLearnedMoves(selectedPokemon.pokemon_id);
            closeModal();
            if (response.moreThan4Moves && response.pingedApi) {
                navigatior.replace('pokemonDetails', {
                    learnedMoves: response.moves,
                    currentTeam: currentTeam,
                    pokemonStats: selectedPokemon
                });
            }
        }
    }

    const createTeam = () => {
        // Check If we have 6 pokemon yet
        if (currentTeam.length != 6) {
            alert("Please Fill Out Your Pokemon Roster!");
            return;
        }
        // Check If The team name is present
        if (localTeamName.length < 3) {
            alert("Please Make Your Team Name 3 Characters Or More!");
            return;
        }
        try {
            addTeamToDatabase(currentTeam, localTeamName, userId);
            navigatior.replace('teams');
        } catch (err) {
            alert('Error with generating team! Please Try again!');
            console.log(err);
        }
    }
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'>Team builder</ThemedText>
                <ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Button title='Cancel' onPress={() => navigatior.navigate('teams')} color={"red"} />
                    <ThemedText style={{ marginHorizontal: 5 }}>Team:</ThemedText>
                    <TextInput
                        style={[styles.inputText, { marginRight: 2.5 }]}
                        placeholder="Name Your Team"
                        value={localTeamName}
                        onChangeText={handleTeamNameChange}
                    />
                    <Button title='Create Team' onPress={createTeam} color={"green"} />
                </ThemedView>
            </ThemedView>
            <View style={{ flexDirection: 'row' }}>
                <FlatList
                    data={filledTeam}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', marginVertical: 10, flexWrap: 'wrap', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'grey', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginHorizontal: 2 }}>
                                {item.pokemon_id !== -1 ? (
                                    <Pressable
                                        onPress={() => removePokemon(index, currentTeam, setCurrentTeam)}
                                        style={{ backgroundColor: '#de333c', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                                    >
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.pokemon_name}</Text>
                                        <Text style={{ color: 'black', textAlign: 'center' }}> (Remove)</Text>
                                    </Pressable>
                                ) : (

                                    <Text style={{ fontSize: 30 }}>{item.pokemon_name}</Text>

                                )}
                            </View>
                        </View>
                    )}
                    numColumns={3}

                />
            </View>
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
                                    source={getPokemonFrontImage(item.pokemon_id)}
                                    style={styles.pokemonItem}
                                    resizeMode="contain"
                                />
                                <ThemedText>{item.pokemon_name}</ThemedText>
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
                                source={getPokemonFrontImage(selectedPokemon.pokemon_id)}
                                style={styles.pokemonImage}
                                resizeMode="contain"
                            />
                            <ThemedText style={styles.modalText}>HP: {selectedPokemon.hp}</ThemedText>
                            <ThemedText style={styles.modalText}>Attack: {selectedPokemon.attack}</ThemedText>
                            <ThemedText style={styles.modalText}>Defense: {selectedPokemon.defense}</ThemedText>
                            <ThemedText style={styles.modalText}>Special Attack: {selectedPokemon.special_attack}</ThemedText>
                            <ThemedText style={styles.modalText}>Special Defense: {selectedPokemon.special_defense}</ThemedText>
                            <ThemedText style={styles.modalText}>Speed: {selectedPokemon.speed}</ThemedText>
                            <Button title="Add To Team" onPress={tryAddToTeam} color={'green'} />
                            <Button title="Close" onPress={closeModal} color={'red'} />
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
        marginBottom: '5%',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: "grey",
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

export default NewTeamPage;