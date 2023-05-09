import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

const API_URL = 'http://d3ee-82-44-28-144.ngrok.io';

// define validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RegisterScreen({ navigation }) {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmitHandler = (values, { setSubmitting }) => {
    formik.validateForm().then(() => {
      if (formik.isValid && values.password === values.confirmPassword) { // Check that form is valid and passwords match
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
  
        fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(async (res) => {
            try {
              const jsonRes = await res.json();
              console.log('Response:', jsonRes);
              if (res.status !== 200) {
                setIsError(true);
                setMessage(jsonRes.message);
              } else {
                setIsError(false);
                setMessage(jsonRes.message);
                navigation.navigate('Login');
              }
            } catch (err) {
              console.log('Error:', err);
            } finally {
              setSubmitting(false);
            }
          })
          .catch((err) => {
            console.log('Error:', err);
            setSubmitting(false);
          });
      } else {
        setSubmitting(false);
      }
    });
  };
  

  const getMessage = () => {
    const errors = Object.keys(formik.errors).filter((key) => {
      return formik.touched[key] && formik.errors[key];
    }).map((key) => {
      return formik.errors[key];
    });
  
    if (errors.length > 0) {
      return `Error: ${errors[0]}`;
    } else if (isError) {
      return `Error: ${message}`;
    } else if (message) {
      return `Success: ${message}`;
    } else {
      return '';
    }
  };  
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitHandler,
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Register</Text>
      </View>

      <KeyboardAvoidingView behavior='padding' style={styles.keyboard}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name='person' style={styles.icon}></Ionicons>
            <TextInput placeholder='First name' style={styles.input} onChangeText={formik.handleChange('firstName')} value={formik.values.firstName} onBlur={formik.handleBlur('firstName')}/>
          </View>
          
          <View style={styles.inputWrapper}>
            <Ionicons name='person' style={styles.icon}></Ionicons>
            <TextInput placeholder='Last name' style={styles.input} onChangeText={formik.handleChange('lastName')} value={formik.values.lastName} onBlur={formik.handleBlur('lastName')}/>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name='mail' style={styles.icon}></Ionicons>
            <TextInput placeholder='Email' style={styles.input} onChangeText={formik.handleChange('email')} value={formik.values.email} onBlur={formik.handleBlur('email')}/>
          </View>
          
          <View style={styles.inputWrapper}>
            <Ionicons name='key' style={styles.icon}></Ionicons>
            <TextInput secureTextEntry={true} placeholder='Password' style={styles.input} onChangeText={formik.handleChange('password')} value={formik.values.password} onBlur={formik.handleBlur('password')}/>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name='key' style={styles.icon}></Ionicons>
            <TextInput secureTextEntry={true} placeholder='Confirm Password' style={styles.input} onChangeText={formik.handleChange('confirmPassword')} value={formik.values.confirmPassword} onBlur={formik.handleBlur('confirmPassword')}/>
          </View>

          <TouchableOpacity style={[styles.button, (!formik.isValid || formik.isSubmitting) && styles.disabledButton]} onPress={formik.handleSubmit} disabled={!formik.isValid || formik.isSubmitting}>
            <Text style={styles.buttonText}>Register Account</Text>
          </TouchableOpacity>

          {message ? (
            <Text style={[styles.message, isError || Object.keys(formik.errors).length > 0 ? styles.error : styles.success, ]} > {getMessage()} </Text>
            ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  
    titleContainer: {
      height: '20%',
    },
  
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#89CFF0',
      textAlign: 'center',
      marginTop: '10%',
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
    },
  
    icon: {
      fontSize: 20,
      padding: 10,
      color: '#89CFF0',
    },
  
    input: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
      color: 'black',
      fontWeight: '700',
      fontSize: 16,
    },
  
    button: {
      alignItems: 'center',
      backgroundColor: '#89CFF0',
      padding: 10,
      borderRadius: 10,
      marginTop: '10%',
    },
  
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  
    error: {
      color: 'red',
      marginVertical: '5%',
      textAlign: 'center',
    },

    success: {
      color: 'green',
      marginVertical: '5%',
      textAlign: 'center',
    },

    enabledButton: {
      opacity: 1,
      backgroundColor: '#89CFF0'
    },

    disabledButton: {
      opacity: 0.5,
      backgroundColor: 'grey'
    }
});