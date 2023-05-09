import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Sunnday = sequelize.define('sundays', {
   MondayID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'SundayID',
   },
});

export default Sunday;