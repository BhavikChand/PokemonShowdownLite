import { UserContext } from '@/components/CurrentUser';
import { getUserTeam } from '@/components/db-functions/db-functions';
import { Team } from '@/components/db-functions/db-types';
import { TeamBubble } from '@/components/team-view/TeamBubble';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    async function fetchData() {
      try {
        let delayTime = 500
        // delay to allow the user id to update.
        await sleep(delayTime);
        console.log("user id is fetch data", userId);

        allRows = await getUserTeam(userId);
        console.log("finished sql")
        let outputString = `Viewing ${userId}:\n`;

        let i = 0;
        for (; i < allRows.length; i++) {
          console.log(allRows[i].team_name)
          itemViews.push(
            <View key={allRows[i].team_id}>
              <TeamBubble text={allRows[i].team_name} />
            </View>
          );
        }
        i = -1; 
        while(itemViews.length < 3) {
          itemViews.push(
            <View key={i}>
              <TeamBubble text={loading} />
            </View>
          );
          i--;
        }
        if (allRows.length < 14) {
          // add the create new team view.
        }
        alert(itemViews.length);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

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
        <ThemedText type='title'>Welcome {username} {userId} </ThemedText>
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
    backgroundColor: '#00FF00'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginHorizontal: '3%',
  },
});