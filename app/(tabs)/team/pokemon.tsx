import { AttackMove, TeamBuilderPokemon, TeamDetailsProps } from "@/components/db-functions/db-types";
import getPokemonFrontImage from "@/components/PokeImgUtil";
import { createNewTeamBuilderPokemon } from "@/components/TeamBuilderUtils";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, FlatList, Image, Modal, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";


const PokemonPage: React.FC<TeamDetailsProps> = ({ route, navigation }) => {
    const navigatior = useNavigation();
    let { currentTeam,
        // learnedMoves,
        pokemonStats } = route.params;
    // DEBUG: charmander stats so that api isnt getting hammered.
    let learnedMoves = [{ "accuracy": 85, "attack_num": 80, "is_special": 0, "move_id": 5, "move_name": "mega-punch", "pp": 20, "type": "normal" }, {
        "accuracy": 100, "attack_num": 75, "is_special": 0, "move_id": 7, "move_name": "fire-punch", "pp": 15,
        "type": "fire"
    }, { "accuracy": 100, "attack_num": 75, "is_special": 0, "move_id": 9, "move_name": "thunder-punch", "pp": 15, "type": "electric" }, { "accuracy": 100, "attack_num": 40, "is_special": 0, "move_id": 10, "move_name": "scratch", "pp": 35, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 14, "move_name": "swords-dance", "pp": 20, "type": "normal" }, { "accuracy": 95, "attack_num": 50, "is_special": 0, "move_id": 15, "move_name": "cut", "pp": 30, "type": "normal" }, { "accuracy": 100, "attack_num": 60, "is_special": 0, "move_id": 17, "move_name": "wing-attack", "pp": 35, "type": "flying" }, { "accuracy": 75, "attack_num": 120, "is_special": 0, "move_id": 25, "move_name": "mega-kick", "pp": 5, "type": "normal" }, { "accuracy": 100, "attack_num": 70, "is_special": 0, "move_id": 29, "move_name": "headbutt", "pp": 15, "type": "normal" }, { "accuracy": 100, "attack_num": 85, "is_special": 0, "move_id": 34, "move_name": "body-slam", "pp": 15, "type": "normal" }, { "accuracy": 85, "attack_num": 90, "is_special": 0, "move_id": 36, "move_name": "take-down", "pp": 20, "type": "normal" }, { "accuracy": 100, "attack_num": 120, "is_special": 0, "move_id": 38, "move_name": "double-edge", "pp": 15, "type": "normal" }, { "accuracy": 100, "attack_num": 0, "is_special": 0, "move_id": 43, "move_name": "leer", "pp": 30, "type": "normal" }, {
        "accuracy": 100, "attack_num": 60,
        "is_special": 0, "move_id": 44, "move_name": "bite", "pp": 25, "type": "dark"
    }, { "accuracy": 100, "attack_num": 0, "is_special": 0, "move_id": 45, "move_name": "growl", "pp": 40, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 46, "move_name": "roar", "pp": 20, "type": "normal" }, { "accuracy": 100, "attack_num": 40, "is_special": 1, "move_id": 52, "move_name": "ember", "pp": 25, "type": "fire" }, {
        "accuracy": 100, "attack_num": 90,
        "is_special": 1, "move_id": 53, "move_name": "flamethrower", "pp": 15, "type": "fire"
    }, { "accuracy": 80, "attack_num": 80, "is_special": 0, "move_id": 66, "move_name": "submission", "pp": 20, "type": "fighting" }, { "accuracy": 100, "attack_num": 0, "is_special": 0, "move_id": 68, "move_name": "counter", "pp": 20, "type": "fighting" }, { "accuracy": 100, "attack_num": 0, "is_special": 0, "move_id": 69, "move_name": "seismic-toss", "pp": 20, "type": "fighting" }, { "accuracy": 100, "attack_num": 80, "is_special": 0, "move_id": 70, "move_name": "strength", "pp": 15, "type": "normal" }, { "accuracy": 100, "attack_num": 0, "is_special": 1, "move_id": 82, "move_name": "dragon-rage", "pp": 10, "type": "dragon" }, { "accuracy": 85, "attack_num": 35, "is_special": 1, "move_id": 83, "move_name": "fire-spin", "pp": 15, "type": "fire" }, { "accuracy": 100, "attack_num": 80, "is_special": 0, "move_id": 91, "move_name": "dig", "pp": 10, "type": "ground" }, { "accuracy": 90, "attack_num": 0, "is_special": 0, "move_id": 92, "move_name": "toxic", "pp": 10, "type": "poison" }, { "accuracy": 100, "attack_num": 20, "is_special": 0, "move_id": 99, "move_name": "rage", "pp": 20, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 102, "move_name": "mimic", "pp": 10, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 104, "move_name": "double-team", "pp": 15, "type": "normal" }, { "accuracy": 100, "attack_num": 0, "is_special": 0, "move_id": 108, "move_name": "smokescreen", "pp": 20, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 111, "move_name": "defense-curl", "pp": 40, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 115, "move_name": "reflect", "pp": 20, "type": "psychic" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 117, "move_name": "bide", "pp": 10, "type": "normal" }, { "accuracy": 85, "attack_num": 110, "is_special": 1, "move_id": 126, "move_name": "fire-blast", "pp": 5, "type": "fire" }, { "accuracy": 0, "attack_num": 60, "is_special": 1, "move_id": 129, "move_name": "swift", "pp": 20, "type": "normal" }, { "accuracy": 100, "attack_num": 130, "is_special": 0, "move_id": 130, "move_name": "skull-bash", "pp": 10, "type": "normal" }, { "accuracy": 80, "attack_num": 18, "is_special": 0, "move_id": 154, "move_name": "fury-swipes", "pp": 15, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 156, "move_name": "rest", "pp": 5, "type": "psychic" }, { "accuracy": 90, "attack_num": 75, "is_special": 0, "move_id": 157, "move_name": "rock-slide", "pp": 10, "type": "rock" }, { "accuracy": 100, "attack_num": 70, "is_special": 0, "move_id": 163, "move_name": "slash", "pp": 20, "type": "normal" }, { "accuracy": 0, "attack_num": 0, "is_special": 0, "move_id": 164, "move_name": "substitute", "pp": 10, "type": "normal" }]
    // console.log(learnedMoves);

    const [selectedBox, setSelectedBox] = useState(-1);
    const [isMoveModalVisible, setMoveModalVisible] = useState(false);
    const [confirmationBox, setConfirmationBox] = useState(false);

    const [moveName1, setMoveName1] = useState("_ _ _ _");
    const [moveName2, setMoveName2] = useState("_ _ _ _");
    const [moveName3, setMoveName3] = useState("_ _ _ _");
    const [moveName4, setMoveName4] = useState("_ _ _ _");
    const moveMap = {
        1: setMoveName1,
        2: setMoveName2,
        3: setMoveName3,
        4: setMoveName4
    };
    const [moveId1, setMoveId1] = useState(-1);
    const [moveId2, setMoveId2] = useState(-1);
    const [moveId3, setMoveId3] = useState(-1);
    const [moveId4, setMoveId4] = useState(-1);
    const moveIdMap = {
        1: setMoveId1,
        2: setMoveId2,
        3: setMoveId3,
        4: setMoveId4
    }
    // Passes back the current team to the new.tsx screen.
    const goBack = () => {
        navigatior.replace('new', { currentTeam: currentTeam, learnedMoves: null, pokemonStats: null });
    }

    // A way to show the stats in a uniform manner.
    const GridItem = ({ stat, number }) => (
        <View style={styles.gridItem}>
            <Text style={styles.gridText}>{stat}{number}</Text>
        </View>
    );

    const openMoveModal = (selectedBox: number) => {
        setSelectedBox(selectedBox);
        setMoveModalVisible(true);
    }
    const closeMoveModal = () => {
        setMoveModalVisible(false);
    };



    const onMoveSelect = (moveID: number, moveName: string) => {
        if (moveMap[selectedBox] && moveIdMap[selectedBox]) {
            moveMap[selectedBox](moveName);
            moveIdMap[selectedBox](moveID);
            console.log('pressed move id' + moveID + 'this is move box ' + selectedBox);
        }
        else {
            alert('error with adding move, try again');
        }
        closeMoveModal();
    };

    const submitPokemon = () => {
        if (moveId1 != -1 && moveId2 != -1 && moveId3 != -1 && moveId4 != -1) {
            setConfirmationBox(true);
            setMoveModalVisible(true);
        }
        else {
            alert('Moves Are Missing! Please Select 4 Moves');
        }
    }
    const addPokemonToTeam = () => {
        let newPokemon = createNewTeamBuilderPokemon(pokemonStats, moveId1, moveId2, moveId3, moveId4);
        currentTeam.push(newPokemon);
        console.log(currentTeam);
        navigatior.replace('new', { currentTeam: currentTeam, learnedMoves: null, pokemonStats: null });

    }
    // Used in the modal to create a row for each move
    const renderItem = ({ item }: { item: AttackMove }) => (
        <View style={[styles.row, { backgroundColor: 'grey', borderRadius: 10, width: '95%', margin: 10, }]}>
            <View style={[styles.content, { flex: 2, padding: 5 }]}>
                <Text style={{ fontSize: 25, color: 'white' }}>{item.move_name}</Text>
                <Text>Attack: {item.attack_num}</Text>
                <Text>Accuracy: {item.accuracy}</Text>
                <Text>PP: {item.pp}</Text>
                <Text>Status: {item.status}</Text>
                <Text>Type: {item.type}</Text>
                <Text>{item.is_special ? 'Special Move' : 'Physical Move'}</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 10 }}>
                <Button title="Select" onPress={() => onMoveSelect(item.move_id, item.move_name)} />
            </View>
        </View>
    );
    // Used to show user what move they have selected currently
    const RenderSelectedMove = ({ boxNumber, moveName }: { boxNumber: number, moveName: string }) => {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.moveItem,
                    { backgroundColor: pressed ? 'black' : '#406370' } // Change color when pressed
                ]}
                android_ripple={{ color: 'lightblue' }} // Ripple effect for Android
                onPress={() =>
                    openMoveModal(boxNumber)
                }>
                <ThemedText>
                    {moveName}
                </ThemedText>
            </Pressable>
        );
    }
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
                <Button title='Add' onPress={submitPokemon} />
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
                        <RenderSelectedMove
                            boxNumber={1}
                            moveName={moveName1} />
                        <RenderSelectedMove
                            boxNumber={2}
                            moveName={moveName2} />
                    </View>
                    <View style={{ margin: 5 }} />
                    <View style={styles.row}>
                        <RenderSelectedMove
                            boxNumber={3}
                            moveName={moveName3} />
                        <RenderSelectedMove
                            boxNumber={4}
                            moveName={moveName4} />
                    </View>
                </View>
                {/* Modal for displaying availible moves */}
                <Modal
                    visible={isMoveModalVisible}
                    animationType='fade'
                    transparent={true}
                    onRequestClose={closeMoveModal}
                >
                    <View style={styles.modalOverlay}>

                        {confirmationBox ? (
                            <View style={styles.modalContent}>
                                <View style={{ height: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>Add This Pokemon to your team?</Text>
                                    <View style={styles.row}>
                                        <Button title='Cancel' onPress={closeMoveModal} color={"red"} />
                                        <View style={{ margin: 5 }} />
                                        <Button title='Add' onPress={addPokemonToTeam} color={"green"} />
                                    </View>
                                </View>
                            </View>) : (
                            <View style={styles.modalContent}>
                                <Button title='Cancel' onPress={closeMoveModal} color={"red"} />
                                <View style={{ margin: 5 }} />
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={learnedMoves}
                                    keyExtractor={(item) => item.move_id.toString()}
                                    renderItem={renderItem}
                                />
                            </View>
                        )}
                    </View>
                </Modal>
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
        flex: 1,
    },
    pokemonImage: {
        width: 100,
        height: 100,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
    },
    topInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        backgroundColor: 'tan',
        marginTop: 20,
        borderRadius: 10,
    },
    statsBox: {
        flex: 5,
        flexDirection: 'column',
        backgroundColor: '#de333c',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    gridItem: {
        backgroundColor: 'grey',
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
    },
    moveItem: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
        paddingVertical: '10%',
    },
    gridText: {
        color: 'white'
    },
    moves: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        backgroundColor: '#de333c',
        height: '50%',
        paddingHorizontal: 5,
        borderRadius: 10
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        marginTop: 90,
        paddingTop: 10,
        paddingRight: 10,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        color: 'black',
    }
});

export default PokemonPage;