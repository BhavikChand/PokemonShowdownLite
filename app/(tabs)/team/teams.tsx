import { UserContext } from '@/components/CurrentUser';
import { getUserTeam } from '@/components/db-functions/db-functions';
import { Team } from '@/components/db-functions/db-types';
import { NewTeam } from '@/components/team-view/NewTeam';
import { TeamBubble } from '@/components/team-view/TeamBubble';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {  ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';

export default function TeamPage() {

  const { username, userId } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [itemViews, setItemViews] = useState<any[]>([]);

  let numTeams = 0;
  let allRows;
  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoading(true);
        setError(null);
        try {
          const delayTime = 500; // Delay to allow the user ID to update
          await new Promise(resolve => setTimeout(resolve, delayTime));
          console.log("user id is (teams page) ", userId);

          let allRows = null;
          allRows = await getUserTeam(userId);
          console.log("finished sql for teams");

          let views = allRows.map(row => (
            <View key={row.team_id}>
              <TeamBubble text={row.team_name} teamId={row.team_id} />
            </View>
          ));

          // Populate fake slots if no teams
          let i = -1;
          while (views.length < 3) {
            views.push(
              <View key={i}>
                <TeamBubble text={null} teamId={null} />
              </View>
            );
            i--;
          }
          // add create button if they have less than 12
          if (allRows.length < 12) {
            views.push(
              <View key={views.length += 1}>
                <NewTeam />
              </View>
            );
          }
          setItemViews(views);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, [userId]) // Dependencies array
  );
// 14 poketeam max.
  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Welcome {username} </ThemedText>
        <View style={styles.spacer}>
          <ThemedText>loser</ThemedText>
        </View>
        <ThemedText>Current Teams:</ThemedText>
      </ThemedView>

      <View style={styles.content}>
        <View style={styles.items}>
          {itemViews}
        </View>
      </View>
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
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10%',
    marginHorizontal: '3%',
    marginBottom: '4%',
  },
  spacer : {
    height: '5%',
    width: '100%',
    backgroundColor: 'red',
    marginBottom: '3%'
  }
});