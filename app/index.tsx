import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '@/components/CurrentUser';

export default function LoginScreen() {
  const navigation = useNavigation()
  // These are collected from the <CurrentUser> that wraps our app in ./_layout.tsx
  const {setUsername, setUserId, userId} = useContext(UserContext);

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

  const handleSubmit = () => {
    if (validateForm()) {
      setUsername(localUsername);
      //TODO: Check username and password through the database to get user id. For now we will always set user as user 0.
      setUserId('0');
      //side note, this is not an instant update, it takes just a little bit of time. Check teams.tsx to see it.
      navigation.navigate('(tabs)');
    }
  };

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
