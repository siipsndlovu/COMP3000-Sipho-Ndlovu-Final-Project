import * as React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground} from 'react-native';

let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let day = new Date().getDay();
let dayName = daysArray[day];
export default function PlannerScreen({navigation}) {
    return(
        <><SafeAreaView style={{ flex: 1, alignItems: 'center', paddingTop: 10}}>
            <Text
                style={{ fontSize: 26, fontWeight: 'bold' }}>Today's Summary</Text>
            <View
                style={{borderWidth: 1, borderRadius: 10, borderColor:'grey', width: '80%', padding: 10, marginTop:20, backgroundColor: '#89CFF0'}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', paddingRight: 5, flex: 3.8 }}>Consumed Calories:</Text>
                    <Text style={{ color: '#f94c56', flex: 1, fontSize: 19, paddingRight: 5 }}>1200</Text>
                    <Text style={{ color: 'blue', flex: 1, fontSize: 19 }}>Kal</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', paddingRight: 5, flex: 3.8 }}>Scheduled Calories:</Text>
                    <Text style={{ color: '#06b3a9', flex: 1, fontSize: 19, paddingRight: 5 }}>2500</Text>
                    <Text style={{ color: 'blue', flex: 1, fontSize: 19 }}>Kal</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', paddingRight: 5, flex: 3.8 }}>Burned Calories:</Text>
                    <Text style={{ color: '#ab66ea', flex: 1, fontSize: 19, paddingRight: 5 }}>120</Text>
                    <Text style={{ color: 'blue', flex: 1, fontSize: 19 }}>Kal</Text>
                </View>
                
            </View>          
        </SafeAreaView>
        <View style={{ flex: 2, flexGrow: 1, marginBottom: 10, minHeight: '20%'}}>
                <Text
                    style={{ fontSize: 26, fontWeight: 'bold', alignSelf:'center', marginTop: -30}}>{dayName} Schedule</Text>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', flexDirection: 'column'}}>
                    <View
                    style={{borderWidth: 1, borderRadius: 10, borderColor:'grey', width: '80%', padding: 20, marginTop:20, backgroundColor: '#06b3a9'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingRight: 5, flex: 1}}>11:00 AM</Text>
                            <Text style={{ color: 'blue', flex: 2, fontSize: 19 , fontWeight:'bold'}}>Lunch</Text>
                        </View>
                    </View>
                    <View
                    style={{borderWidth: 1, borderRadius: 10, borderColor:'grey', width: '80%', padding: 20, marginTop:20, backgroundColor: '#f94c56'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingRight: 5, flex: 1}}>15:30 PM</Text>
                            <Text style={{ color: 'darkviolet', flex: 2, fontSize: 19, fontWeight:'bold' }}>Cardio Workout</Text>
                        </View>
                    </View>
                    <View
                    style={{borderWidth: 1, borderRadius: 10, borderColor:'grey', width: '80%', padding: 20, marginTop:20, backgroundColor: '#89CFF0'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingRight: 5, flex: 1}}>17:00 PM</Text>
                            <Text style={{ color: 'limegreen', flex: 2, fontSize: 19, fontWeight:'bold' }}>Snack</Text>
                        </View>
                    </View>
                    <View
                    style={{borderWidth: 1, borderRadius: 10, borderColor:'grey', width: '80%', padding: 20, marginTop:20, backgroundColor: '#89CFF0'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingRight: 5, flex: 1}}>18:30 PM</Text>
                            <Text style={{ color: 'limegreen', flex: 2, fontSize: 19, fontWeight:'bold' }}>Dinner</Text>
                        </View>
                    </View>
                </ScrollView>           
        </View></> 
    );
}