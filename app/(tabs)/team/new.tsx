import { UserContext } from '@/components/CurrentUser';
import { getPokemonByName, getUserTeam } from '@/components/db-functions/db-functions';
import { Team } from '@/components/db-functions/db-types';
import { TeamBubble } from '@/components/team-view/TeamBubble';
import React, { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityIndicator, StatusBar, StyleSheet, View, Button, TextInput, FlatList, Text } from 'react-native';

// export default function NewTeamPage() {

//     return (
//         <ThemedView style={styles.container}>
//             <ThemedView style={styles.titleContainer}>
//                 <ThemedText type='title'>Welcome To the team builder</ThemedText>
//             </ThemedView>

//         </ThemedView>
//     );

// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         paddingTop: StatusBar.currentHeight,
//         paddingLeft: '5%',
//         paddingRight: '5%'
//     },
//     content: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     items: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: "flex-start",
//         flexWrap: 'wrap',
//         height: '100%',
//         backgroundColor: '#00FF00'
//     },
//     titleContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: '10%',
//         marginHorizontal: '3%',
//     },
// });

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
    // const handleAddToTeam = async (pokemonId) => {
    //     try {
    //         await addPokemonToTeam(pokemonId);
    //         alert('Pokémon added to team!');
    //     } catch (error) {
    //         console.error('Error adding Pokémon to team:', error);
    //     }
    // };

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
                    data={pokemonList}
                    keyExtractor={(item) => item.pokemon_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.pokemonItem}>
                            <Text style={styles.inputText}>{item.pokemon_name}</Text>
                            <Button title="Add to Team" onPress={() => handleAddToTeam(item.pokemon_id)} />
                        </View>
                    )}
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
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    inputText: {
        color: 'white',
      },
});
