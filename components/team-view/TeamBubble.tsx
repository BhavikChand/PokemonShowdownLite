import { View, Dimensions, Image, Text, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";


// Get the screen width
const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height;
export function TeamBubble({ text }) {
  return (
    <View style={styles.rippleHide}> 
      <Pressable
        style={({ pressed }) => [
          styles.teamcontainer,
          { backgroundColor: pressed ? 'darkred' : '#FF0000' } // Change color when pressed
        ]}
        android_ripple={{ color: 'lightblue' }} // Ripple effect for Android
        onPress={() => alert('Pressed!')}>
        <Image
          source={require('./../../assets/images/pokeball/default.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText>
          Hbox popoff
        </ThemedText>
      </Pressable>
    </View>

  );
};

const styles = StyleSheet.create({
  rippleHide: {
    overflow: 'hidden',
    borderRadius: 30,
  },
  teamcontainer : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * .40,
    height: screenHeight * .10,
    backgroundColor: '#FF0000',
    margin: 5, 
    borderRadius: 30,
    fontWeight: 'bold',
  },
  image: {
    height: '40%',
    width: undefined,
    aspectRatio: 1,
    marginLeft: 3,
    marginRight: 5,
  }
});