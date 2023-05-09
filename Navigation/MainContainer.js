import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PlannerScreen from './Screens/PlannerScreen';
import NutritionScreen from './Screens/NutritionScreen';
import WorkoutScreen from './Screens/WorkoutScreen';
import ProfileScreen from './Screens/ProfileScreen';

const plannerName = 'Planner';
const nutritionName = 'Nutrition';
const workoutName = 'Workout';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 20, height: 70 , backgroundColor: '#89CFF0' },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === plannerName) {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === nutritionName) {
              iconName = focused ? 'nutrition' : 'nutrition-outline';
            } else if (route.name === workoutName) {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name={plannerName} component={PlannerScreen} />
        <Tab.Screen name={nutritionName} component={NutritionScreen} />
        <Tab.Screen name={workoutName} component={WorkoutScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
