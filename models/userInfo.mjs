import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.mjs';

const userInfo = sequelize.define('userInfo', {
    UserID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      references: {
         model: 'users',
         key: 'UserID',
      },
      field: 'UserID',
   },
   gender: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'Gender',
    },
    dob: {
     type: Sequelize.STRING,
      allowNull: false,
      field: 'DOB',
    },
    height: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Height',
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Weight',
    },
    healthGoal: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'HealthGoal',
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
    }
}, {
    // Define a default scope that joins the userInfo and users tables
    defaultScope: {
        include: [
            {
                model: User,
                attributes: []
            }
        ]
    },
    // Define a unique constraint on the (UserID, dob) combination
    indexes: [
        {
            unique: true,
            fields: ['UserID', 'dob']
        }
    ]
});

export default userInfo;