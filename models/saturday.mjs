import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Saturday = sequelize.define('saturdays', {
   MondayID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'SaturdayID',
   },
});

export default Saturday;