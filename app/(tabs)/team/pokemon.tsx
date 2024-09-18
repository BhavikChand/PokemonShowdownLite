import { TeamDetailsProps } from "@/components/db-functions/db-types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";


const PokemonPage: React.FC<TeamDetailsProps> = ({ route, navigation }) => {
    const navigatior = useNavigation();
    let { pokemonId, currentTeam, learnedMoves } = route.params;

    const goBack = () => {
        navigatior.navigate('new', { pokemonId: pokemonId, learnedMoves: learnedMoves, currentTeam: currentTeam });
    }

    if (typeof (pokemonId) == 'undefined') {
        return (
            <ThemedView>
                <ThemedText>
                    Error
                </ThemedText>
                <Button title='Cancel' onPress={goBack} color={"red"} />
            </ThemedView>
        )
    }
    return (
        <ThemedView>
            <ThemedText>Hello welcome to team details</ThemedText>
            <ThemedText> {pokemonId} </ThemedText>
            <Button title='Cancel' onPress={goBack} color={"red"} />
        </ThemedView>
    )
}

export default PokemonPage;