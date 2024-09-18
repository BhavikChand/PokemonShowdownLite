import { View, Dimensions, Image, Text, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useNavigation } from '@react-navigation/native';
import getPokemonFrontImage from "../PokeImgUtil";


// Get the screen width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export function PokemonBubble({ text, pokemonId, screen }) {
    const navigatior = useNavigation();
    if (text === null) {
        return (
            <View style={styles.rippleHide}>
                <Pressable
                    style={({ pressed }) => [
                        styles.fakeContainer,
                        { backgroundColor: 'transparent' } // Change color when pressed
                    ]}
                    android_ripple={{ color: 'lightblue' }} // Ripple effect for Android
                >
                    <ThemedText>
                        _ _ _ _
                    </ThemedText>
                </Pressable>
            </View>

        );
    }
    return (
        <View style={styles.rippleHide}>
            <Pressable
                style={({ pressed }) => [
                    styles.teamcontainer,
                    { backgroundColor: pressed ? 'black' : '#406370' } // Change color when pressed
                ]}
                android_ripple={{ color: 'lightblue' }} // Ripple effect for Android
                onPress={() =>
                    navigatior.navigate(screen, { pokemonId: pokemonId })
                }>
                <Image
                    source={require(getPokemonFrontImage(pokemonId))}
                    style={styles.image}
                    resizeMode="contain"
                />
                <ThemedText>
                    {text}
                </ThemedText>
            </Pressable>
        </View>

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
        backgroundColor: '#4d4a44',
        margin: 5,
        marginBottom: 5,
        borderRadius: 30,
        fontWeight: 'bold',
    },
    fakeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * .40,
        height: screenHeight * .10,
        margin: 5,
        marginBottom: 5,
        borderRadius: 30,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    image: {
        height: '40%',
        width: undefined,
        aspectRatio: 1,
        marginLeft: 0,
        marginRight: 5,
    }
});