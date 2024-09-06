import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamPage from "./app/pages/teams";
import LoginScreen from "./app";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="teams" component={TeamPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}