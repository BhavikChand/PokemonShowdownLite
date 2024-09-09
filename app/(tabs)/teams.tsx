import { UserContext } from '@/components/CurrentUser';
import { TeamBubble } from '@/components/team-view/TeamBubble';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useContext } from 'react';
import {  StatusBar, StyleSheet, View } from 'react-native';

export default function TeamPage() {

  const { username, userId } = useContext(UserContext);


  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Welcome!</ThemedText>
      </ThemedView>

      <View style={styles.content}>
        <View style={styles.items}>
          <TeamBubble text='yo'/>
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
          <TeamBubble text='yo' />
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