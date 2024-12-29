import { Sequelize } from 'sequelize';

const conn = new Sequelize('db', 'root', 'root',{
    host: 'localhost',
    'dialect': 'mysql'
})

export default conn;

