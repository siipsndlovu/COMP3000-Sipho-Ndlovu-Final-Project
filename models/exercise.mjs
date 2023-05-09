import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Exercise = sequelize.define('exercises', {
   ExerciseID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'ExerciseID',
   },
   workouts_WorkoutID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'workouts',
      key: 'WorkoutID'
    },
    field: 'workouts_WorkoutID',
   },
   exerciseItems_ExerciseItemID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'exerciseitems',
      key: 'ExerciseItemID'
    },
    field: 'exerciseItems_ExerciseItemID',
   },
});

export default Exercise;