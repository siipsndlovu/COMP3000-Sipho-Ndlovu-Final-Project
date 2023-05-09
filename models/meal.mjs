import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Meal = sequelize.define('meals', {
   MealID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'MealID'
   },
   time: {
    type: Sequelize.INTEGER,
     allowNull: false,
     field: 'Time',
   },
   mondays_MondayID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'mondays',
      key: 'MondayID'
    },
    field: 'mondays_MondayID',
   },
   tuesdays_TuesdayID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'tuesdays',
      key: 'TuesdayID'
    },
    field: 'tuesdays_TuesdayID',
   },
   wednesdays_WednesdayID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'wednesdays',
      key: 'WednesdayID'
    },
    field: 'wednesdays_WednesdayID',
   },
   thursdays_ThursdayID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'thursdays',
      key: 'ThursdayID'
    },
    field: 'thursdays_ThursdayID',
   },
   fridays_FridayID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'fridays',
      key: 'FridayID'
    },
    field: 'fridays_FridayID',
   },
   saturdays_SaturdayID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model:'saturdays',
      key: 'SaturdayID'
    },
    field:'saturdays_SaturdayID',
   },
   sundays_SundayID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model:'sundays',
      key: 'SundayID'
    },
    field:'sundays_SundayID',
   }
});

export default Meal;