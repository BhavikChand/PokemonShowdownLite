import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamPage from './teams';
import { TeamDetails } from './details';
import NewTeamPage from './new';

const Stack = createNativeStackNavigator();


export default function RootLayout() {
    
    const colorScheme = useColorScheme();

    return (
        <NavigationContainer
            independent={true}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="teams"
                        component={TeamPage}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="details"
                        component={TeamDetails}
                        options={{ title: 'Viewing Team:' }}
                    />
                    <Stack.Screen
                        name="new"
                        component={NewTeamPage}
                        options={{ title: 'Viewing Team:' }}
                    />
                </Stack.Navigator>
            </ThemeProvider>
        </NavigationContainer>

    );
}
