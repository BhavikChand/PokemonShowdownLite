import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '@/components/CurrentUser';
import { getUser, startDBAndTables } from '@/components/db-functions/db-functions';

export default function LoginScreen() {
  // When the app starts, start up the database
  startDBAndTables();

  const navigation = useNavigation();

  // These are collected from the <CurrentUser> that wraps our app in ./_layout.tsx
  const { setUsername, setUserId, } = useContext(UserContext);

  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let tempErrors = {};

    if (!localUsername) {
      tempErrors.username = 'Username is required';
      valid = false;
    }

    if (!password) {
      tempErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async () => {
    let tempErrors = {}

    if (validateForm()) {
      try {
        let user = await getUser(localUsername, password);
        console.log("user is", user);

        if (user) {
          setUsername(user.username);
          setUserId(user.user_id);
          // . replace prevents users from going back to the sign in screen once logged in.
          navigation.replace('(tabs)');
        } else {
          tempErrors.password = "Password or Username was invalid";
          setErrors(tempErrors);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>login</Text>

      <Image
        source={require('@/assets/images/pokemon_logo.png')}
        style={styles.logo}
      />

      <TextInput
        style={[styles.input, styles.inputText]}
        placeholder="Username"
        value={localUsername}
        onChangeText={setLocalUsername}
      />
      {errors.username && <Text style={styles.error}>{errors.username}</Text>}

      <TextInput
        style={[styles.input, styles.inputText]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <Button title="Login" onPress={handleSubmit} />
      <View style={styles.spacer} />


      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>No account? </Text>
        <Text onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputText: {
    color: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: "white"
  },
  signUpLink: {
    fontSize: 16,
    color: 'blue',
  },
  spacer: {
    flexGrow: 0.5, // Takes up all available space between login button and sign-up text
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 100,
  },

});
