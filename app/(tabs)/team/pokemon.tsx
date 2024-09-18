import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TeamDetailsProps } from "@/components/Types/types";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";


const PokemonPage: React.FC<TeamDetailsProps> = ({ route, navigation }) => {
    const navigatior = useNavigation();
    let { pokemonId } = route.params;

    // might want to figure out why the light mode dark mode stuff broke, low priority. 
    if (typeof (pokemonId) == 'undefined') {
        return (
            <ThemedView>
                <ThemedText>
                    Error
                </ThemedText>
            </ThemedView>
        )
    }
    return (
        <ThemedView>
            <ThemedText>Hello welcome to team details</ThemedText>
            <ThemedText> {pokemonId} </ThemedText>
        </ThemedView>
    )
}

export default PokemonPage;