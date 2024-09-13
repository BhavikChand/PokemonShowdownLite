import { UserContext } from '@/components/CurrentUser';
import { StyleSheet, Image, Platform, StatusBar, View, Button, Modal, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function TabTwoScreen() {

    const navigation = useNavigation();

    const { username, userId, setUsername, setUserId } = useContext(UserContext);
    const [isModalVisible, setModalView] = useState(false);
    const signOutProcess = async () => {
        setModalView(false);
        try {
            setUsername('');
            setUserId(-1);
            // There is no delay here for the values to update because the log in screen does not care about these values, and you cant navigate back
            navigation.getParent()?.replace('index');
        } catch (err) {
            alert("Error with signing out, try again");
        }


    }
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <View style={styles.rowBox}>
                    <ThemedText type='title'>Settings</ThemedText>
                    <View style={{ width: 80 }} />
                    <Image
                        source={require('@/assets/images/trainer.png')}
                        style={styles.trainerImage}
                    />
                </View>
            </ThemedView>
            <ThemedView style={styles.content}>
                <ThemedText>User: {username} </ThemedText>
                <View style={styles.spacer} />
                <Button title='Sign Out' onPress={() => setModalView(true)} color={"red"} />
            </ThemedView>
            <Modal
                visible={isModalVisible}
                animationType='fade'
                style={styles.modalBox}
                statusBarTranslucent
                transparent
            >
                <View style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
                    <View style={styles.modalContent}>
                        <Text>Are You Sure You Want To Sign Out?</Text>
                        <View style={styles.rowBox}>
                            <Button title='Cancel' onPress={() => setModalView(false)} color={"grey"} />
                            <View style={{ width: 5 }} />
                            <Button title='Sign Out' onPress={signOutProcess} color={"red"} />
                        </View>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: StatusBar.currentHeight,
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    items: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'wrap',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10%',
        marginHorizontal: '3%',
        marginBottom: '4%',
    },
    spacer: {
        height: '5%',
        width: '100%',
        marginBottom: '3%'
    },
    rowBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    modalBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        display: 'flex',
        height: 100,
        marginTop: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%',
        borderRadius: 15,
    },
    trainerImage: {
        objectFit: 'contain',
        width: 100,
        height: 100,
    }
});
