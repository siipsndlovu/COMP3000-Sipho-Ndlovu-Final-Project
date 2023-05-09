import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Tuesday = sequelize.define('tuesdays', {
   TuesdayID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'TuesdayID',
   },
});

export default Tuesday;