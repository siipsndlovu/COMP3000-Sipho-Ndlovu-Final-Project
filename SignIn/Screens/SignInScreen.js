import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, SafeAreaView, TextInput,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const addUserIDToLoggedInTable = async (userID) => {
    try {
      const db = SQLite.openDatabase('localData.db');
      await db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO LoggedIn (UserID) VALUES (?)',
          [userID],
          () => console.log('UserID added to LoggedIn table successfully'),
          (error) => console.error('Error adding UserID to LoggedIn table:', error)
        );
      });
      console.log('localData database opened successfully');
    } catch (error) {
      console.error('Error opening localData database:', error);
    }
  };

  const onSubmitHandler = () => {
    const payload = { email, password };
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            const { message, token, user } = jsonRes;
            console.log(jsonRes)
            setMessage(message);
            if (user.accountInit === 0) {
              addUserIDToLoggedInTable(user.userId);
              console.log(user.userId);
              navigation.navigate('AccountInitContainer', { user });
            } else {
              addUserIDToLoggedInTable(user.userId);
              console.log(user.userId);
              navigation.navigate('MainContainer', { user });
            }
          } else {
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Log-In</Text>
      </View>

      <KeyboardAvoidingView behavior='padding' style={styles.keyboard}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name='mail' style={styles.icon} />
            <TextInput
              placeholder='Email'
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name='key' style={styles.icon} />
            <TextInput
              placeholder='Password'
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={styles.registerContainer}>
            <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            {message !== '' && (
              <View style={styles.messageContainer}>
                <Text style={[styles.messageText, message.includes('user logged in') ? styles.messageSuccess : styles.messageError]}>{message}</Text>
                </View>
            )}

            <View style={styles.registerWrapper}>
              <Ionicons name='person-add' style={styles.icon} />
              <Text style={styles.registerText}>Don't Have an account yet?</Text>
            </View>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#89CFF0',
    textAlign: 'center',
  },
  keyboard: {
    flex: 1,
    alignItems: 'center',
    marginTop: '9%',
  },
  inputContainer: {
    width: '80%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#89CFF0',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '5%',
    width: '100%',
    height: 50,
  },
  icon: {
    color: '#89CFF0',
    fontSize: 20,
    padding: 10,
  },
  input: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#89CFF0',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  messageSuccess: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  messageError: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  registerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  registerText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#89CFF0',
  },
});