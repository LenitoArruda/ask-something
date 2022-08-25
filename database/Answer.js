const Sequelize = require("sequelize");
const conn = require("./Database");

const Answer = conn.define("answers",{
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false});
module.exports = Answer;