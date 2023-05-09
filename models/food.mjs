import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const Food = sequelize.define('foods', {
   FoodID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'FoodID',
   },
   meals_MealID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'meals',
      key: 'MealID'
    },
    field: 'meals_MealID',
   },
   foodItems_Food_ItemsID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    references: {
      model: 'fooditems',
      key: 'Exercise_ItemsID'
    },
    field: 'exerciseItems_Exercise_ItemsID',
   },
});

export default Food;