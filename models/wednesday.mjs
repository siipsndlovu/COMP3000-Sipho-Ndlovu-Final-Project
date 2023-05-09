import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Wednesday = sequelize.define('wednesdays', {
   MondayID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'WednesdayID',
   },
});

export default Wednesday;