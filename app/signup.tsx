import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    let errorMessages = {};
    if (!username) {
      errorMessages.username = 'Username is required';
    }
    if (!password) {
      errorMessages.password = 'Password is required';
    }
    if (password !== retypePassword) {
      errorMessages.retypePassword = 'Passwords do not match';
    }

    if(password.length < 6) {
      errorMessages.password = 'Password must be at least 6 characters';
    }

    setErrors(errorMessages);

    if (Object.keys(errorMessages).length === 0) {
      console.log('User signed up:', { username, password });
      Alert.alert(
        "Success",
        "Account successfully created!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('index'), 
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Image 
        source={require('@/assets/images/pokemon_logo.png')} 
        style={styles.logo}
      />

      <TextInput
        style={[styles.input, styles.inputText]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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

      <TextInput
        style={[styles.input, styles.inputText]}
        placeholder="Retype Password"
        secureTextEntry
        value={retypePassword}
        onChangeText={setRetypePassword}
      />
      {errors.retypePassword && <Text style={styles.error}>{errors.retypePassword}</Text>}

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  inputText: {
    color: 'white',
  },
  error: {
    color: 'red',
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center', 
    marginBottom: 100, 
  },
});
