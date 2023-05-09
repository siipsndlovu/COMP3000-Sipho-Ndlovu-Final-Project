import React, { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import SignInContainer from './SignIn/SignInContainer';

function App() {

  useEffect(() => {
    const resetLoggedInTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
          tx.executeSql(
            'DROP TABLE IF EXISTS LoggedIn',
            [],
            () => console.log('Table dropped successfully'),
            (error) => console.error('Error dropping table:', error)
          );

          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS LoggedIn (UserID INTEGER PRIMARY KEY NOT NULL)',
            [],
            () => console.log('LoggedIn table created successfully'),
            (error) => console.error('Error creating LoggedIn table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };

    resetLoggedInTable();
  }, []);
  

  useEffect(() => {
    const createUserInfoTable = async () => {
      try{
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {

          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS UserInfo (
              UserID INTEGER NOT NULL ,
              Gender TEXT NOT NULL,
              DOB TEXT NOT NULL,
              Height INTEGER NOT NULL,
              Weight INTEGER NOT NULL,
              HealthGoal TEXT NOT NULL,
              Calories INTEGER NOT NULL,
              Fat INTEGER NOT NULL,
              Protein INTEGER NOT NULL,
              Sugar INTEGER NOT NULL,
              Fiber INTEGER NOT NULL,
              Sodium INTEGER NOT NULL,
              Foreign Key (UserID) REFERENCES LoggedIn (UserID)
            )`,
            [],
            () => console.log('UserInfo table created successfully'),
            (error) => console.error('Error creating UserInfo table:', error)
          );
        });
      }
      catch (error) {
        console.error('Error creating UserInfo table:', error);
      }
    };
    createUserInfoTable();
  }, []);

  useEffect(() => {
    const createScheduleTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Schedule' table with a foreign key 'UserID' that references the 'UserID' in the 'LoggedIn' table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Schedule (
              ScheduleID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              users_UserID INTEGER NOT NULL,
              MondayID INTEGER NOT NULL,
              TuesdayID INTEGER NOT NULL,
              WednesdayID INTEGER NOT NULL,
              ThursdayID INTEGER NOT NULL,
              FridayID INTEGER NOT NULL,
              SaturdayID INTEGER NOT NULL,
              SundayID INTEGER NOT NULL,
              FOREIGN KEY (users_UserID) REFERENCES LoggedIn (UserID)
              FOREIGN KEY (MondayID) REFERENCES Monday (MondayID)
              FOREIGN KEY (TuesdayID) REFERENCES Tuesday (TuesdayID)
              FOREIGN KEY (WednesdayID) REFERENCES Wednesday (WednesdayID)
              FOREIGN KEY (ThursdayID) REFERENCES Thursday (ThursdayID)
              FOREIGN KEY (FridayID) REFERENCES Friday (FridayID)
              FOREIGN KEY (SaturdayID) REFERENCES Saturday (SaturdayID)
              FOREIGN KEY (SundayID) REFERENCES Sunday (SundayID)
            )`,
            [],
            () => console.log('Schedule table created successfully'),
            (error) => console.error('Error creating Schedule table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createScheduleTable();
  }, []);

  useEffect(() => {
    const createMondayTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Monday' table with a primary key column 'MondayID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Monday (
              MondayID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
            )`,
            [],
            () => console.log('Monday table created successfully'),
            (error) => console.error('Error creating Monday table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createMondayTable();
  }, []);
  
  useEffect(() => {
    const createTuesdayTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Monday' table with a primary key column 'MondayID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Tuesday (
              TuesdayID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
            )`,
            [],
            () => console.log('Tuesday table created successfully'),
            (error) => console.error('Error creating Tuesday table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createTuesdayTable();
  }, []);

  useEffect(() => {
    const createWednesdayTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
          console.log('Transaction object:', tx);
  
          // Create the 'Monday' table with a primary key column 'MondayID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Wednesday (
              WednesdayID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
            )`,
            [],
            () => console.log('Wednesday table created successfully'),
            (error) => console.error('Error creating Wednesday table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createWednesdayTable();
  }, []);

  useEffect(() => {
    const createThursdayTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Monday' table with a primary key column 'MondayID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Thursday (
              ThursdayID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
            )`,
            [],
            () => console.log('Thursday table created successfully'),
            (error) => console.error('Error creating Thursday table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createThursdayTable();
  }, []);

  useEffect(() => {
    const createFridayTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Monday' table with a primary key column 'MondayID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Friday (
              FridayID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
            )`,
            [],
            () => console.log('Friday table created successfully'),
            (error) => console.error('Error creating Friday table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createFridayTable();
  }, []);

  useEffect(() => {
    const createSaturdayTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Monday' table with a primary key column 'MondayID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Saturday (
              SaturdayID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
            )`,
            [],
            () => console.log('Saturday table created successfully'),
            (error) => console.error('Error creating Saturday table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createSaturdayTable();
  }, []);

  useEffect(() => {
    const createSundayTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Monday' table with a primary key column 'MondayID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Sunday (
              SundayID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
            )`,
            [],
            () => console.log('Sunday table created successfully'),
            (error) => console.error('Error creating Sunday table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createSundayTable();
  }, []);

  useEffect(() => {
    const createMealTable = async () => {
      try{
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {

          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Meal (
              MealID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              Time INTEGER NOT NULL,
              mondays_MondayID INTEGER,
              tuesdays_TuesdayID INTEGER,
              wednesdays_WednesdayID INTEGER,
              thursdays_ThursdayID INTEGER,
              fridays_FridayID INTEGER,
              saturdays_SaturdayID INTEGER,
              sundays_SundayID INTEGER,
              FOREIGN KEY (mondays_MondayID) REFERENCES Monday (MondayID),
              FOREIGN KEY (tuesdays_TuesdayID) REFERENCES Tuesday (TuesdayID),
              FOREIGN KEY (wednesdays_WednesdayID) REFERENCES Wednesday (WednesdayID),
              FOREIGN KEY (thursdays_ThursdayID) REFERENCES Thursday (ThursdayID),
              FOREIGN KEY (fridays_FridayID) REFERENCES Friday (FridayID),
              FOREIGN KEY (saturdays_SaturdayID) REFERENCES Saturday (SaturdayID),
              FOREIGN KEY (sundays_SundayID) REFERENCES Sunday (SundayID)
              )`,
            [],
            () => console.log('Meal table created successfully'),
            (error) => console.error('Error creating Meal table:', error)
          );
        });
        console.log('localData database opened successfully');
      }
      catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createMealTable();
  }, []);

  useEffect(() => {
    const createFoodTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
        
          // Create the 'Food' table with a foreign key 'FoodItemID' that references the 'FoodItemID' in the 'foods' table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Food (
              FoodID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              meals_MealID INTEGER NOT NULL,
              foodItems_FoodItemID INTEGER NOT NULL,
              FOREIGN KEY (foodItems_FoodItemID) REFERENCES FoodItem (FoodItemID),
              FOREIGN KEY (meals_MealID) REFERENCES Meal (MealID)
            )`,
            [],
            () => console.log('Food table created successfully'),
            (error) => console.error('Error creating Food table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createFoodTable();
  }, []);
  
  useEffect(() => {
    const createFoodItemTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
        
          // Create the 'FoodItem' table with a primary key 'FoodItemID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS FoodItem (
              FoodItemID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              Food_Name TEXT NOT NULL,
              Calories INTEGER NOT NULL,
              Fat INTEGER NOT NULL,
              Protein INTEGER NOT NULL,
              Sugar INTEGER NOT NULL,
              Fiber INTEGER NOT NULL,
              Sodium INTEGER NOT NULL
            )`,
            [],
            () => console.log('FoodItem table created successfully'),
            (error) => console.error('Error creating FoodItem table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createFoodItemTable();
  }, []);

  useEffect(() => {
    const createWorkoutTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
  
          // Create the 'Workout' table with foreign keys with NOT-NULL values of false
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Workout (
              WorkoutID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              Time INTEGER NOT NULL,
              mondays_MondayID INTEGER,
              tuesdays_TuesdayID INTEGER,
              wednesdays_WednesdayID INTEGER,
              thursdays_ThursdayID INTEGER,
              fridays_FridayID INTEGER,
              saturdays_SaturdayID INTEGER,
              sundays_SundayID INTEGER,
              FOREIGN KEY (mondays_MondayID) REFERENCES Monday (MondayID),
              FOREIGN KEY (tuesdays_TuesdayID) REFERENCES Tuesday (TuesdayID),
              FOREIGN KEY (wednesdays_WednesdayID) REFERENCES Wednesday (WednesdayID),
              FOREIGN KEY (thursdays_ThursdayID) REFERENCES Thursday (ThursdayID),
              FOREIGN KEY (fridays_FridayID) REFERENCES Friday (FridayID),
              FOREIGN KEY (saturdays_SaturdayID) REFERENCES Saturday (SaturdayID),
              FOREIGN KEY (sundays_SundayID) REFERENCES Sunday (SundayID)
            )`,
            [],
            () => console.log('Workout table created successfully'),
            (error) => console.error('Error creating Workout table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createWorkoutTable();
  }, []);

  useEffect(() => {
    const createExerciseTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
        
          // Create the 'Food' table with a foreign key 'FoodItemID' that references the 'FoodItemID' in the 'foods' table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Exercise (
              ExerciseID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              workouts_WorkoutID INTEGER NOT NULL,
              exerciseItems_ExerciseItemID INTEGER NOT NULL,
              FOREIGN KEY (exerciseItems_ExerciseItemID) REFERENCES ExerciseItem (ExerciseItemID),
              FOREIGN KEY (workouts_workoutID) REFERENCES Workout (WorkoutID)
            )`,
            [],
            () => console.log('Exercise table created successfully'),
            (error) => console.error('Error creating Exercise table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createExerciseTable();
  }, []);

  useEffect(() => {
    const createExerciseItemTable = async () => {
      try {
        const db = SQLite.openDatabase('localData.db');
        await db.transaction((tx) => {
        
          // Create the 'FoodItem' table with a primary key 'FoodItemID'
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ExerciseItem (
              ExerciseItemID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              Exercise_Name TEXT NOT NULL,
              MET INTEGER NOT NULL
            )`,
            [],
            () => console.log('Exercise table created successfully'),
            (error) => console.error('Error creating Exercise table:', error)
          );
        });
        console.log('localData database opened successfully');
      } catch (error) {
        console.error('Error opening localData database:', error);
      }
    };
    createExerciseItemTable();
  }, []);






  return (
    <SignInContainer />
  );
}

export default App;