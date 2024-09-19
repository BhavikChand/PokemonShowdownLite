import { AttackMove, TeamDetailsProps } from "@/components/db-functions/db-types";
import getPokemonFrontImage from "@/components/PokeImgUtil";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, FlatList, Image, Modal, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";


const PokemonPage: React.FC<TeamDetailsProps> = ({ route, navigation }) => {
    const navigatior = useNavigation();
    let { currentTeam, learnedMoves, pokemonStats } = route.params;
    const [selectedBox, setSelectedBox] = useState(-1);
    const [isModalVisible, setModalVisible] = useState(false);
    const [moveName1, setMoveName1] = useState("_ _ _ _");
    const [moveName2, setMoveName2] = useState("_ _ _ _");
    const [moveName3, setMoveName3] = useState("_ _ _ _");
    const [moveName4, setMoveName4] = useState("_ _ _ _");

    // Passes back the current team to the new.tsx screen.
    const goBack = () => {
        navigatior.replace('new', { currentTeam: currentTeam });
    }

    // A way to show the stats in a uniform manner.
    const GridItem = ({ stat, number }) => (
        <View style={styles.gridItem}>
            <Text style={styles.gridText}>{stat}{number}</Text>
        </View>
    );

    const openModal = (selectedBox: number) => {
        setSelectedBox(selectedBox);
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    };

    const onMoveSelect = (moveID: number) => {
        alert('pressed move id' + moveID + 'this is move box ' + selectedBox);
    };

    // Used in the modal to create a row
    const renderItem = ({ item }: { item: AttackMove }) => (
        <View style={[styles.row, { backgroundColor: 'grey', borderRadius: 10, width: '100%', margin: 10 }]}>
            <View style={[styles.content, { flex: 2 }]}>
                <Text>{item.move_name}</Text>
                <Text>Attack: {item.attack_num}</Text>
                <Text>Accuracy: {item.accuracy}</Text>
                <Text>PP: {item.pp}</Text>
                <Text>Status: {item.status}</Text>
                <Text>Type: {item.type}</Text>
                <Text>{item.is_special ? 'Special Move' : 'Physical Move'}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Button title="Select" onPress={() => onMoveSelect(item.move_id)} />
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
                    openModal(boxNumber)
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
                    visible={isModalVisible}
                    animationType='fade'
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Button title='Cancel' onPress={closeModal} color={"red"} />
                            <View style={{ margin: 5 }} />
                            <FlatList
                                style={{ width: '100%' }}
                                data={learnedMoves}
                                keyExtractor={(item) => item.move_id.toString()}
                                renderItem={renderItem}
                            />
                        </View>
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
        backgroundColor: 'green',
        borderRadius: 10,
    },
    topInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        backgroundColor: 'red',
        marginTop: 20,
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
        backgroundColor: 'red',
        height: '50%'
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