import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Monday = sequelize.define('mondays', {
   MondayID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'MondayID',
   },
});

export default Monday;