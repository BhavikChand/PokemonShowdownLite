import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";


export function TeamDetails({route, navigation}) {
    let {teamId} = route.params;
    // might want to figure out why the light mode dark mode stuff broke, low priority. 
    if(typeof(teamId)== 'undefined') {
        return(
            <ThemedView>
                <ThemedText>
                    Error
                </ThemedText>
            </ThemedView>
        )
    }
    return(
        <ThemedView>
            <ThemedText>Hello welcome to team details</ThemedText>
            <ThemedText> {teamId} </ThemedText>
        </ThemedView>
    )
}