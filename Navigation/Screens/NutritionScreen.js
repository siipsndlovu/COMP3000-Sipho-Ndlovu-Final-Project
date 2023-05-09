import * as React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function NutritionScreen({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
            onPress={() => navigation.navigate('Nutrition')}
            style={{fontSize: 26, fontWeight: 'bold' }}>Nutrition</Text>
        </View> 
    );
}