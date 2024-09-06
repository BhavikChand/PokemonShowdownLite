import { Image, StyleSheet, Platform, Button, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { debugViewAllUser, startDBAndTables } from '@/components/db-functions/db-functions';
import { generateFakeUsersDB } from '@/components/db-functions/db-generate';

export default function HomeScreen() {
    const debugButtonCreateDB = async () => {
        try {
            await startDBAndTables();
            alert('Async operation complete!');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const debugButtonViewDB = async () => {
        try {
            let allRows = await debugViewAllUser();
            let string = 'Viewing users:\n';
            for (const row of allRows) {
                string += `${row.user_id}, ${row.username}, ${row.password}\n`; 
            }
            alert(string);
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
            <Button title='Show all users' onPress={debugButtonViewDB} />

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
