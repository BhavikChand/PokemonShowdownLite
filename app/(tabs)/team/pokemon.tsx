import { TeamDetailsProps } from "@/components/db-functions/db-types";
import getPokemonFrontImage from "@/components/PokeImgUtil";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Image, StatusBar, StyleSheet, Text, View } from "react-native";


const PokemonPage: React.FC<TeamDetailsProps> = ({ route, navigation }) => {
    const navigatior = useNavigation();
    let { currentTeam, learnedMoves, pokemonStats } = route.params;
    const goBack = () => {
        navigatior.replace('new', { currentTeam: currentTeam });
    }

    const GridItem = ({ stat, number }) => (
        <View style={styles.gridItem}>
            <Text style={styles.gridText}>{stat}{number}</Text>
        </View>
    );

    if (typeof (learnedMoves) == 'undefined') {
        return (
            <ThemedView style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText>
                    Error, please try again
                </ThemedText>
                <Button title='Return to Search' onPress={goBack} color={"red"} />
            </ThemedView>
        )
    }
    return (
        <ThemedView style={styles.container}>
            <View style={styles.titleContainer}>
                <Button title='Cancel' onPress={goBack} color={"red"} />
                <ThemedText type="title">{pokemonStats.pokemon_name}</ThemedText>
                <Button title='Add' onPress={() => alert('yo')} />
            </View>
            <View style={styles.content}>
                <View style={styles.topInfo}>
                    <Image
                        source={getPokemonFrontImage(pokemonStats.pokemon_id)}
                        style={[styles.pokemonImage, { flex: 2 }]}
                        resizeMode="contain"
                    />
                    <View style={styles.statsBox}>
                        <View style={styles.row}>
                            <GridItem stat={'HP:'} number={pokemonStats.hp} />
                            <GridItem stat={'Att:'} number={pokemonStats.attack} />
                            <GridItem stat={'Def:'} number={pokemonStats.defense} />
                        </View>
                        <View style={{ margin: 5 }} />
                        <View style={styles.row}>
                            <GridItem stat={'Sp.Att:'} number={pokemonStats.special_attack} />
                            <GridItem stat={'Sp.Def:'} number={pokemonStats.special_defense} />
                            <GridItem stat={'Speed:'} number={pokemonStats.speed} />
                        </View>
                    </View>
                </View>
                <View style={{ margin: '10%' }} />
                <View style={styles.moves}>
                    <View style={styles.row}>
                        <GridItem stat={'HP:'} number={pokemonStats.hp} />
                        <GridItem stat={'Att:'} number={pokemonStats.attack} />
                    </View>
                    <View style={{ margin: 5 }} />
                    <View style={styles.row}>
                        <GridItem stat={'Sp.Att:'} number={pokemonStats.special_attack} />
                        <GridItem stat={'Sp.Def:'} number={pokemonStats.special_defense} />
                    </View>
                </View>


            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: '5%',
    },
    titleContainer: {
        paddingTop: 30,
        marginBottom: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    pokemonImage: {
        width: 100,
        height: 100,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
    },
    topInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        backgroundColor: 'red'
    },
    statsBox: {
        flex: 5,
        flexDirection: 'column',
        backgroundColor: 'blue'
    },
    gridItem: {
        backgroundColor: 'grey',
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
    },
    gridText: {
        color: 'white'
    },
    moves: {
        backgroundColor: 'blue',
    }

});

export default PokemonPage;