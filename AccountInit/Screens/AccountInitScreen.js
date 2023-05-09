import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Keyboard, TouchableWithoutFeedback, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';


export default function AccountInitScreen({ navigation }) {
  const [numberOfForms, setNumberOfForms] = useState(3);
  const [formsData, setFormsData] = useState([]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [inputData, setInputData] = useState({
    gender: '',
    dob: new Date(),
    height: '',
    weight: '',
    healthGoal: '',
  });
  const [newInputData, setNewInputData] = useState({
    mealsPerDay: '',
    meals: [],
  });
  const [newInputData2, setNewInputData2] = useState({
    workoutsPerDay: '',
    workouts: [],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timePickers, setTimePickers] = useState([]);

  useEffect(() => {
    const getLoggedInUserId = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        console.log('Database opened successfully');
        await db.transaction((tx) => {
          tx.executeSql(
            'SELECT UserID FROM LoggedIn',
            [],
            (_, results) => {
              if (results.rows.length > 0) {
                // Set the retrieved UserID in state
                setLoggedInUserId(results.rows.item(0).UserID);
                console.log('Retrieved LoggedIn UserID: ' , loggedInUserId);
              }
            },
            (error) => {
              console.error('Error retrieving LoggedIn data:', error);
              console.log('SQL statement:', error?.sql);
            }
          );
        });
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };
    
    getLoggedInUserId();
  }, []);

  useEffect(() => {
    console.log('New LoggedIn UserId:', loggedInUserId);
  }, [loggedInUserId]);
  
    

  useEffect(() => {
    const initialFormsData = Array(numberOfForms).fill({});
    setFormsData(initialFormsData);
  }, [numberOfForms]);

  // Generate an array of time pickers based on the number of meals per day
  useEffect(() => {
    if (currentFormIndex === 1 && newInputData.meals) {
      const numberOfTimePickers = newInputData.meals.length;
      const timePickerArray = Array.from({ length: numberOfTimePickers }, (_, index) => ({
        id: index + 1,
        time: new Date(),
        mealIndex: index,
      }));
      setTimePickers(timePickerArray);
    }
  }, [currentFormIndex, newInputData.meals]);

  useEffect(() => {
    if (currentFormIndex === 1 && newInputData2.workouts) {
      const numberOfTimePickers = newInputData2.workouts.length;
      const timePickerArray = Array.from({ length: numberOfTimePickers }, (_, index) => ({
        id: index + 1,
        time: new Date(),
        workoutIndex: index,
      }));
      setTimePickers(timePickerArray);
    }
  }, [currentFormIndex, newInputData2.workouts]);

  // Update the formsData state when the inputData or newInputData for the current form changes
  useEffect(() => {
    let currentFormData;
    if (currentFormIndex === 1) {
      currentFormData = newInputData;
    } else if (currentFormIndex === 2) {
        currentFormData = newInputData2;
    } else {
        currentFormData = inputData;
    }
    if (Object.values(currentFormData).every(Boolean)) {
      setFormsData((prevFormsData) => {
        const updatedFormsData = [...prevFormsData];
        updatedFormsData[currentFormIndex] = currentFormData;
        return updatedFormsData;
      });
    }
  }, [currentFormIndex, inputData, newInputData, newInputData2]);

  useEffect(() => {
    if (alertTriggered) {
      setInputData({
        gender: '',
        dob: new Date(),
        height: '',
        weight: '',
        healthGoal: '',
      });
      setNewInputData({
        mealsPerDay: '',
        meals: [],
      });
      setNewInputData2({
        workoutsPerDay: '',
        workouts: [],
      });
      setAlertTriggered(false);
    }
  }, [alertTriggered]);

  function calculateMacros(formData) {
    const bmr = calculateBMR(formData);
    const healthGoal = formData.healthGoal;
    const calories = calculateCalories(bmr, healthGoal);
    const fat = calculateFat(calories);
    const protein = calculateProtein(calories, healthGoal, formData);
    const sugar = calculateSugar(calories);
    const fiber = calculateFiber(calories);
    const sodium = calculateSodium(calories);
  
    return {
      calories,
      fat,
      protein,
      sugar,
      fiber,
      sodium,
    };
  }

  function calculateBMR(formData) {
    // Calculate the user's BMR using the Harris–Benedict equation
    // You can use the constants below for the calculation
    const weightInKg = parseFloat(formData.weight);
    const heightInCm = parseFloat(formData.height);
    const dob = moment(formData.dob);
    const ageInYears = moment().diff(dob, 'years');
    const genderFactor = formData.gender === 'Male' ? 5 : -161;
    return Math.round(10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + genderFactor);
  }  

  function calculateCalories(bmr, healthGoal) {
    // Adjust BMR based on health goal
    switch (healthGoal) {
      case 'Gain Muscle Mass':
        return Math.round(bmr * 1.2);
      case 'Maintain Current Weight':
        return bmr;
      case 'Lose Weight':
        return Math.round(bmr * 0.8);
      default:
        return bmr;
    }
  }
  
  function calculateFat(calories) {
    return Math.round(calories * 0.3 / 9);
  }
  
  function calculateProtein(calories, healthGoal, formData) {
    switch (healthGoal) {
      case 'Gain Muscle Mass':
        // Increase protein intake to 1 gram per pound of body weight
        return Math.round(parseFloat(formData.weight) * 1 * 4);
      default:
        return Math.round(calories * 0.4 / 4);
    }
  }
  
  function calculateSugar(calories) {
    return Math.round(calories * 0.1 / 4);
  }
  
  function calculateFiber(calories) {
    return Math.round(calories * 0.15 / 4);
  }
  
  function calculateSodium(calories) {
    return Math.round(calories * 0.05 / 2.5);
  }

  const validateAge = (dob) => {
    const age = moment().diff(dob, 'years');
    return age >= 16;
  };

  const validateTimes = (times) => {
    const uniqueTimes = new Set(times.map((time) => moment(time).format('HH:mm:ss')));
    return uniqueTimes.size === times.length;
  };  
  
  const handleFormSubmit = () => {
    let currentFormData;
    if (currentFormIndex === 1) {
      currentFormData = newInputData;
      const areTimesValid = validateTimes(newInputData.meals.map((meal) => meal.time));
      if (!areTimesValid) {
        alert('Meal times cannot be the same. Please check again.');
        setAlertTriggered(true);
        return;
      }
    } else if (currentFormIndex === 2) {
      currentFormData = newInputData2;
      const areTimesValid = validateTimes(newInputData2.workouts.map((workout) => workout.time));
      if (!areTimesValid) {
        alert('Workout times cannot be the same. Please check again.');
        setAlertTriggered(true);
        return;
      }
      handleSubmitAllForms(loggedInUserId);
    } else {
      currentFormData = inputData;
    }
  
    // validate age if current form is form 0
    if (currentFormIndex === 0) {
      const isAgeValid = validateAge(inputData.dob);
      if (!isAgeValid) {
        alert('You must be 16 or older to use this app.');
        setAlertTriggered(true);
        return;
      }
    }
  
    if (Object.values(currentFormData).every(Boolean)) {
      console.log('Submitting form data: ', currentFormData);
      setFormsData((prevFormsData) => {
        const updatedFormsData = [...prevFormsData];
        updatedFormsData[currentFormIndex] = currentFormData;
        return updatedFormsData;
      });
    }
  
    // Reset the input data for the current form and move on to the next form
    if (currentFormIndex < numberOfForms - 1) {
      setCurrentFormIndex(currentFormIndex + 1);
      setInputData({
        gender: inputData.gender,
        dob: new Date(),
        height: '',
        weight: '',
        healthGoal: inputData.healthGoal,
      });
      setNewInputData({
        mealsPerDay: '',
        meals: [],
      });
      setNewInputData2({
        workoutsPerDay: '',
        workouts: [],
      });
    }
  };  

  const handleSubmitAllForms = (loggedInUserId) => {
    const formData = formsData.map((data, index) => ({
      id: index + 1,
      ...data,
    }));
    console.log('All form data: ', formData);
  
    // calculate the macros
    if (!alertTriggered) {
      const macrosData = calculateMacros(formsData[0]);
      console.log('Calculated macros: ', macrosData);
      SaveUserInfo(loggedInUserId, formData, macrosData);
      navigation.navigate('MainContainer');
    }
  };  

  const SaveUserInfo = async (loggedInUserId, formData, macrosData) => {
    try{
      const id = loggedInUserId;
      const gender = formData[0].gender;
      const dob = formData[0].dob.toISOString().split('T')[0];
      const height = parseFloat(formData[0].height);
      const weight = parseFloat(formData[0].weight);
      const healthGoal = formData[0].healthGoal;
      const calories = macrosData.calories;
      const fat = macrosData.fat;
      const protein = macrosData.protein;
      const sugar = macrosData.sugar;
      const fiber = macrosData.fiber;
      const sodium = macrosData.sodium;
      const db = SQLite.openDatabase('localData.db');
      console.log(id, gender, dob, height, weight, healthGoal, calories, fat, protein, sugar, fiber, sodium);
      await db.transaction((tx) => {
        console.log('Saving UserInfo data: ', id);
        tx.executeSql(
          `INSERT INTO UserInfo (
            UserID,
            Gender,
            DOB,
            Height,
            Weight,
            HealthGoal,
            Calories,
            Fat,
            Protein,
            Sugar,
            Fiber,
            Sodium
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            loggedInUserId,
            gender,
            dob,
            height,
            weight,
            healthGoal,
            calories,
            fat,
            protein,
            sugar,
            fiber,
            sodium,
          ],
          (_, results) => {
            if (results.insertId) {
              console.log(`UserInfo data inserted successfully with ID: ${results.insertId}`);
            }
          },
          (error) => console.error('Error inserting UserInfo data:', error)
        );          
      });
    } catch (error) {
      console.error('Error inserting UserInfo data: ', error);
    }
  };
  
  const handleInputDataChange = (text, field) => {
    if (field === 'gender' || field === 'healthGoal') {
      if (text) {
        setInputData({
          ...inputData,
          [field]: text
        });
      }
    } else {
      setInputData((prevInputData) => ({
        ...prevInputData,
        [field]: text,
      }));
    }
  }; 

  const handleNewInputData2Change = (text, field) => {
    if (field === 'workoutsPerDay') {
      setNewInputData2((prevInputData) => ({
        ...prevInputData,
        workoutsPerDay: text,
        workouts: Array.from({ length: parseInt(text) }, (_, i) => ({ id: i + 1, time: new Date() })),
      }));
    }
  };

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker
    
    if (currentFormIndex === 0) {
      const currentDate = moment(selectedDate, 'DD/MM/YYYY').isValid() ? selectedDate : inputData.dob;
      const formattedDate = moment(currentDate).format('DD/MM/YYYY');
      setInputData((prevInputData) => ({
        ...prevInputData,
        dob: currentDate,
      }));
    } else if (currentFormIndex === 1) {
      // Update the time property of the selected meal
      const selectedMealIndex = showDatePicker - 1;
      if (moment(selectedDate).isValid()) {
        const selectedTime = selectedDate;
        setNewInputData((prevInputData) => ({
          ...prevInputData,
          meals: prevInputData.meals.map((meal, index) => {
            if (index === selectedMealIndex) {
              return {
                ...meal,
                time: selectedTime,
              };
            }
            return meal;
          }),
        }));
      }
    } else if (currentFormIndex === 2) {
      // Update the time property of the selected workout
      const selectedWorkoutIndex = showDatePicker - 1;
      if (moment(selectedDate).isValid()) {
        const selectedTime = selectedDate;
        setNewInputData2((prevInputData) => ({
          ...prevInputData,
          workouts: prevInputData.workouts.map((workout, index) => {
            if (index === selectedWorkoutIndex) {
              return {
                ...workout,
                time: selectedTime,
              };
            }
            return workout;
          }),
        }));
      }
    }
  };  

  const handleNewInputDataChange = (text, field) => {
    if (field === 'mealsPerDay') {
      setNewInputData((prevInputData) => ({
        ...prevInputData,
        mealsPerDay: text,
        meals: Array.from({ length: parseInt(text) }, (_, i) => ({ id: i + 1, time: new Date() })),
      }));
    } else if (field === 'workoutsPerDay') {
      setNewInputData((prevInputData) => ({
        ...prevInputData,
        workoutsPerDay: text,
        workouts: Array.from({ length: parseInt(text) }, (_, i) => ({ id: i + 1, time: new Date() })),
      }));
    }
  };

  const handleTimePickerChange = (time, index) => {
    setShowDatePicker(index + 1); // Show the date picker for the selected meal or workout
  };
  

  const renderForm = (index) => {
    const genderOptions = ['Male', 'Female'];
    const healthGoalOptions = ['Gain Muscle Mass', 'Maintain Current Weight', 'Lose Weight'];

    switch (index) {
      case 0:
        return (
          <View key={index} style={styles.formContainer}>
            <Text style={styles.formTitle}>Gender:</Text>
            <Picker
              style={styles.formInput}
              onValueChange={(value) => handleInputDataChange(value, 'gender')}
              selectedValue={inputData.gender}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>

            <Text style={styles.formTitle}>Date of Birth (DD/MM/YYYY):</Text>
            <TouchableOpacity style={styles.datePickerContainer} onPress={() => setShowDatePicker(true)}>
              <Text>{moment(inputData.dob).format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>
            {showDatePicker && currentFormIndex === 0 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={inputData.dob}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}

            <Text style={styles.formTitle}>Height (cm):</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(text) => handleInputDataChange(text, 'height')}
              value={inputData.height}
              keyboardType="numeric"
              onEndEditing={() => {
                Keyboard.dismiss();
              }}
            />

            <Text style={styles.formTitle}>Weight (kg):</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(text) => handleInputDataChange(text, 'weight')}
              value={inputData.weight}
              keyboardType="numeric"
              onEndEditing={() => {
                Keyboard.dismiss();
              }}
            />

            <Text style={styles.formTitle}>Health Goal:</Text>
            <Picker
              style={styles.formInput}
              onValueChange={(value) => handleInputDataChange(value, 'healthGoal')}
              selectedValue={inputData.healthGoal}
            >
              <Picker.Item label="Select Health Goal" value="" />
              <Picker.Item label="Gain Muscle Mass" value="Gain Muscle Mass" />
              <Picker.Item label="Maintain Current Weight" value="Maintain Current Weight" />
              <Picker.Item label="Lose Weight" value="Lose Weight" />
            </Picker>
            <Button title="Next" disabled={!inputData.weight || !inputData.dob || !inputData.height || !inputData.gender || !inputData.healthGoal} onPress={handleFormSubmit} />
          </View>
        );
      case 1:
        return (
          <View key={index} style={styles.formContainer}>
            <Text style={styles.formTitle}>How many meals do you eat per day?</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(text) => handleNewInputDataChange(text, 'mealsPerDay')}
              value={newInputData.mealsPerDay}
              keyboardType="numeric"
              onEndEditing={() => {
                Keyboard.dismiss();
              }}
            />

            {newInputData.meals.map((meal, index) => (
              <View key={index} style={styles.mealContainer}>
                <Text style={styles.formTitle}>{`Meal ${meal.id} Time:`}</Text>
                <TouchableOpacity
                  style={styles.datePickerContainer}
                  onPress={() => handleTimePickerChange(meal.time, index)}
                >
                  <Text>{moment(meal.time).format('hh:mm A')}</Text>
                </TouchableOpacity>
                {showDatePicker === index + 1 && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={meal.time}
                    mode="time"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            ))}

            <Button
              title="Next"
              onPress={handleFormSubmit}
            />
          </View>
        );
      case 2:
        return (
          <View key={index} style={styles.formContainer}>
            <Text style={styles.formTitle}>How many workouts do you do per day?</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(text) => handleNewInputData2Change(text, 'workoutsPerDay')}
              value={newInputData2.workoutsPerDay}
              keyboardType="numeric"
              onEndEditing={() => {
                Keyboard.dismiss();
              }}
            />

            {newInputData2.workouts.map((workout, index) => (
              <View key={index} style={styles.mealContainer}>
                <Text style={styles.formTitle}>{`Workout ${workout.id} Time:`}</Text>
                <TouchableOpacity
                  style={styles.datePickerContainer}
                  onPress={() => handleTimePickerChange(workout.time, index)}
                >
                  <Text>{moment(workout.time).format('hh:mm A')}</Text>
                </TouchableOpacity>
                {showDatePicker === index + 1 && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={workout.time}
                    mode="time"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            ))}

            <Button
              title="Submit"
              onPress={() => {
                handleFormSubmit(); 
            }} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          {[...Array(numberOfForms)].map((_, index) => (
            <View
              key={index}
              style={[styles.progressCircle, index <= currentFormIndex && styles.filledProgressCircle]}
            />
          ))}
        </View>
        {renderForm(currentFormIndex)}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    progressContainer: {
      flexDirection: 'row',
      marginVertical: 30,
    },
    progressCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#bbb',
      marginHorizontal: 10,
    },
    filledProgressCircle: {
      backgroundColor: '#89CFF0',
    },
    formContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 40,
      paddingHorizontal: 10,
      backgroundColor: '#f6f6f6',
      borderRadius: 10,
      marginBottom: 20,
      marginHorizontal: 10,
    },
    formTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginVertical: 10,
      color: '#89CFF0',
    },
    formInput: {
      borderWidth: 1,
      borderColor: '#89CFF0',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 5,
    },
    mealContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    datePickerContainer: {
      borderWidth: 1,
      borderColor: '#89CFF0',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 5,
    },
  });