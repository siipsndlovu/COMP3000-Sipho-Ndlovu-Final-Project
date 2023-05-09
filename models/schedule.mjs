import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Schedule = sequelize.define('schedules', {
  ScheduleID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    field: 'ScheduleID',
  },
  users_UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'UserID'
    },
    field: 'users_UserID',
  },
  MondayID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'mondays',
      key: 'MondayID'
    },
    field: 'MondayID',
  },
  TuesdayID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tuesdays',
      key: 'TuesdayID'
    },
    field: 'TuesdayID',
  },
  WednesdayID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'wednesdays',
      key: 'WednesdayID'
    },
    field: 'WednesdayID',
  },
  ThursdayID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'thursdays',
      key: 'ThursdayID'
    },
    field: 'ThursdayID',
  },
  FridayID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'fridays',
      key: 'FridayID'
    },
    field: 'FridayID',
  },
  SaturdayID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'saturdays',
      key: 'SaturdayID'
    },
    field: 'SaturdayID',
  },
  SundayID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'sundays',
      key: 'SundayID'
    }
  },
});

export default Schedule;
