import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamPick from './team-pick';
import BattleScreen from './battle';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
    
    const colorScheme = useColorScheme();

    return (
        <NavigationContainer
            independent={true}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="battle"
                        component={TeamPick}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="battle-arena"
                        component={BattleScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </ThemeProvider>
        </NavigationContainer>

    );
}
