import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Friday = sequelize.define('fridays', {
   FridayID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'FridayID',
   },
});

export default Friday;