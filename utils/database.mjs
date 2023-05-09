import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('complete_fitness_db', 'root', 'Koolkat2001!', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;