import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Thursday = sequelize.define('Thursdays', {
   ThursdayID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'ThursdayID',
   },
});

export default Thursday;