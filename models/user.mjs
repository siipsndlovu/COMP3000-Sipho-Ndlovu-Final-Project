import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const User = sequelize.define('users', {
   UserID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'Email',
   },
   firstName: {
      type: Sequelize.STRING,
      field: 'First_Name',
   },
   lastName: {
      type: Sequelize.STRING,
      field: 'Last_Name',
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'Password',
   },
   AccountInit: {
      type: Sequelize.TINYINT(1),
      field: 'Account_Init',
   }
});

export default User;
