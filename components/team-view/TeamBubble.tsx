import { View, Dimensions, Image, Text, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useNavigation } from '@react-navigation/native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export function TeamBubble({ text, teamId, screen }) {
  const navigatior = useNavigation();
  if (text === null) {
    return (
      <View style={styles.rippleHide} testID="team-bubble-null">
        <Pressable
          style={({ pressed }) => [
            styles.fakeContainer,
            { backgroundColor: 'transparent' } // Change color when pressed
          ]}
          android_ripple={{ color: 'lightblue' }} // Ripple effect for Android
          testID="pressable-fake"
        >
          <ThemedText testID="themed-text-fake">
            _ _ _ _
          </ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.rippleHide} testID="team-bubble">
      <Pressable
        style={({ pressed }) => [
          styles.teamcontainer,
          { backgroundColor: pressed ? 'black' : '#406370' } // Change color when pressed
        ]}
        android_ripple={{ color: 'lightblue' }} // Ripple effect for Android
        onPress={() =>
          navigatior.navigate(screen, { teamId: teamId })
        }
        testID="pressable-team"
      >
        <Image
          source={require('./../../assets/images/pokeball/default.png')}
          style={styles.image}
          resizeMode="contain"
          testID="image-pokeball"
        />
        <ThemedText testID="themed-text-team">
          {text}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rippleHide: {
    overflow: 'hidden',
    borderRadius: 30,
  },
  teamcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * .40,
    height: screenHeight * .10,
    backgroundColor: '#4d4a44',
    margin: 5,
    marginBottom: 5,
    borderRadius: 30,
    fontWeight: 'bold',
  },
  fakeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * .40,
    height: screenHeight * .10,
    margin: 5,
    marginBottom: 5,
    borderRadius: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  image: {
    height: '40%',
    width: undefined,
    aspectRatio: 1,
    marginLeft: 0,
    marginRight: 5,
  }
});
