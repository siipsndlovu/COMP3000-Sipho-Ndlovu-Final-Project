import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const FoodItem = sequelize.define('foods', {
   FoodItemID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'FoodItemID',
   },
   foodName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'Food_Name',
   },
   calories: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Calories',
   },
   fat:{
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Fat',
   },
   protein: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Protein',
   },
   sugar: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Sugar',
   },
   fiber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Fiber',
   },
   sodium: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Sodium',
   },
});

export default FoodItem;