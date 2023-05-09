import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const ExerciseItem = sequelize.define('exerciseitems', {
   ExerciseItemID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'ExerciseItemID',
   },
   exerciseName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'Exercise_Name',
   },
   met: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'MET',
   },
   reps: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Reps',
   },
});

export default ExerciseItem;