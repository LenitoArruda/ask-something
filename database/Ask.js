const Sequelize = require("sequelize");
const conn = require("./Database");

const Question = conn.define('question',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(()=>{});

module.exports = Question;