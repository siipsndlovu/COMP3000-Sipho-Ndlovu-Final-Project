import * as React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function WorkoutScreen({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
            onPress={() => navigation.navigate('Workout')}
            style={{fontSize: 26, fontWeight: 'bold' }}>Workout</Text>
        </View> 
    );
}