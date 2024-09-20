import { View, Dimensions, Image, Text, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useNavigation } from "@react-navigation/native";


// Get the screen width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export function NewTeam() {
    const navigatior = useNavigation();

    return (
        <View style={styles.rippleHide}>
            <Pressable
                style={({ pressed }) => [
                    styles.teamcontainer,
                    { backgroundColor: pressed ? 'black' : '#404040' } // Change color when pressed
                ]}
                android_ripple={{ color: 'black' }} // Ripple effect for Android
                onPress={() =>
                    navigatior.navigate('new', { currentTeam: [], learnedMoves: null, pokemonStats: null })
                }>
                <Image
                    source={require('./../../assets/images/plus.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <ThemedText>
                    New Team
                </ThemedText>
            </Pressable>
        </View >

    );
};

const styles = StyleSheet.create({
    rippleHide: {
        overflow: 'hidden',
        borderRadius: 30,
    },
    teamcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * .40,
        height: screenHeight * .10,
        backgroundColor: '#FFF',
        margin: 5,
        marginBottom: 5,
        borderRadius: 30,
        fontWeight: 'bold',
    },
    image: {
        height: '40%',
        width: undefined,
        aspectRatio: 1,
        marginLeft: 3,
        marginRight: 10,
    }
});