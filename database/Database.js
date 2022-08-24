const Sequelize = require('sequelize');
const conn = new Sequelize('db_question','root','database1234',{
    host: 'localhost',
    dialect: 'mysql'
}); 

module.exports = conn;