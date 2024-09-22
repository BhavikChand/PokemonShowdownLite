import React, { useEffect, useState, Animated } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getPokemonWithMoves } from '@/components/db-functions/db-functions';
import getPokemonFrontImage, { getPokemonBackImage } from '@/components/PokeImgUtil';
import { battle } from '@/scripts/battle';

export default function BattleScreen({ route, navigation }) {
    let { teamId } = route.params;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [opponentTeam, setOpponentTeam] = useState([]);
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const team = await getPokemonWithMoves(teamId);
                const opponent = await getPokemonWithMoves(0); // Replace "0" with actual opponent team ID

                setSelectedTeam(team);
                setOpponentTeam(opponent);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [teamId]);

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Error: {error.message}</ThemedText>
            </ThemedView>
        );
    }

    const currentPlayerPokemon = selectedTeam[currentPokemonIndex];
    const currentOpponentPokemon = opponentTeam[0];

    console.log(currentPlayerPokemon);

    const handleMovePress = (move) => {
        // Implement logic to handle move selection here
        battle(currentPlayerPokemon, currentOpponentPokemon, move);
        console.log(`Move selected: ${move.move_name}`);
    };

    const handleSwitch = () => {
        console.log("Switching Pokémon");
        setCurrentPokemonIndex((prevIndex) => (prevIndex + 1) % selectedTeam.length);
        // TODO : handle when a pokemon fainted
    };

    const getHpBarColor = (hp, maxHp) => {
        console.log(hp);
        const hpPercentage = (hp / maxHp) * 100;
        if (hpPercentage > 50) {
            return 'green';
        } else if (hpPercentage > 20) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.battleContainer}>
                {/* Opponent's Pokémon */}
                <View style={styles.opponentPokemonContainer}>
                    {currentOpponentPokemon && (
                        <>
                            <Text style={styles.pokemonName}>{currentOpponentPokemon.pokemon_name}</Text>
                            <View style={styles.hpBarContainer}>
                                <View style={[
                                    styles.hpBar,
                                    {
                                        width: `${(currentOpponentPokemon.pokemon_hp / currentOpponentPokemon.pokemon_maxHp) * 100}%`,
                                        backgroundColor: getHpBarColor(currentOpponentPokemon.pokemon_hp, currentOpponentPokemon.pokemon_maxHp)
                                    }]}
                                />
                            </View>
                            <Image source={getPokemonFrontImage(currentOpponentPokemon.pokemon_id)} style={styles.opponentPokemonImage} />
                        </>
                    )}
                </View>

                {/* User Pokémon */}
                <View style={styles.playerPokemonContainer}>
                    {currentPlayerPokemon && (
                        <>
                            <Image source={getPokemonBackImage(currentPlayerPokemon.pokemon_id)} style={styles.playerPokemonImage} />
                            <Text style={styles.pokemonName}>{currentPlayerPokemon.pokemon_name}</Text>
                            <View style={styles.hpBarContainer}>
                                <View style={[
                                    styles.hpBar,
                                    {
                                        width: `${(currentPlayerPokemon.pokemon_hp / currentPlayerPokemon.pokemon_maxHp) * 100}%`,
                                        backgroundColor: getHpBarColor(currentPlayerPokemon.pokemon_hp, currentPlayerPokemon.pokemon_maxHp)
                                    }]}
                                />
                            </View>
                        </>
                    )}
                </View>
            </View>

            {/* Action Menu */}
            <View style={styles.actionMenu}>
                <View style={styles.movesGrid}>
                    {currentPlayerPokemon && currentPlayerPokemon.moves && currentPlayerPokemon.moves.length > 0 && (
                        currentPlayerPokemon.moves.slice(0, 4).map((move, index) => (
                            <TouchableOpacity
                                key={move.move_id}
                                style={styles.moveButton}
                                onPress={() => handleMovePress(move)}
                            >
                                <Text style={styles.moveText}>{move.move_name}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>

                {/* Switch Pokémon Button */}
                <TouchableOpacity
                    onPress={() => handleSwitch()}
                    style={styles.switchButton}>
                    <Text style={styles.moveText}>Switch Pokémon</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    battleContainer: {
        flex: 3,
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#fff',
    },
    opponentPokemonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
        position: 'absolute',
        top: 80,
        left: '75%',
        transform: [{ translateX: -60 }],
        borderRadius: 10,
        padding: 10,
    },
    playerPokemonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 80,
        left: '30%',
        transform: [{ translateX: -60 }],
        borderRadius: 10,
        padding: 10,
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    opponentPokemonImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    playerPokemonImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    hpBarContainer: {
        width: 100,
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    hpBar: {
        height: '100%',
        backgroundColor: 'green',
    },
    actionMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    movesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    moveButton: {
        width: '45%',
        height: 60,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    moveText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    switchButton: {
        width: '45%',
        height: 60,
        backgroundColor: '#f5a623',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
