import { Image, StyleSheet, Platform, Button, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { debugGetAllUser, resetDatabase, startDBAndTables } from '@/components/db-functions/db-functions';
import { generateFakeUsersDB } from '@/components/db-functions/db-generate-fakes';
import * as SQLite from 'expo-sqlite'
import { User } from '@/components/db-functions/db-types';

export default function HomeScreen() {

    const debugButtonCreateDB = async () => {
        try {
            await startDBAndTables();
            alert('Async operation complete!');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    async function debugButtonViewDB(tableName: string){
        try {
            let db = await SQLite.openDatabaseAsync('Showdown');
            let query = `SELECT * FROM ${tableName}`;
            let allRows = await db.getAllAsync(query);

            let outputString = `Viewing ${tableName}:\n`;

            for (let row of allRows) {
                outputString += `${JSON.stringify(row)}\n`;
            }
            alert(outputString)
        } catch (error) {
            console.error('Error:', error )
            alert("there is an error");
        }
    }
    const debugButtonFakeUsers = async () => {
        try {
            await generateFakeUsersDB();
            alert('fake users made');
        } catch (error) {
            console.error('Error:', error)
            alert("there is an error");
        }
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Debug Page!</ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText>Debug Page!</ThemedText>
            </ThemedView>

            <Button title='StartDB' onPress={debugButtonCreateDB}/>
            <Button title='Generate Fake Users' onPress={debugButtonFakeUsers}/>
            <Button title='Show all users' onPress={() => debugButtonViewDB("user")} />
            <Button title='Show all teams' onPress={() => debugButtonViewDB("teams")} />
            <Button title='Show all pokemon' onPress={() => debugButtonViewDB("pokemon")} />
            <Button title='Show all moves' onPress={() => debugButtonViewDB("moves")} />
            <Button title='Show all pokemon stats' onPress={() => debugButtonViewDB("pokemon_stats")} />
            <Button title='Reset Database' onPress={() => resetDatabase()} />


        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
