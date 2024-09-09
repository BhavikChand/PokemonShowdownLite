import { UserContext } from '@/components/CurrentUser';
import { getUserTeam } from '@/components/db-functions/db-functions';
import { Team } from '@/components/db-functions/db-types';
import { TeamBubble } from '@/components/team-view/TeamBubble';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';

export default function NewTeamPage() {

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'>Welcome To the team builder</ThemedText>
            </ThemedView>

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
        backgroundColor: '#00FF00'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%',
        marginHorizontal: '3%',
    },
});