module.exports = (Sequelize, sequelize) => {
     return sequelize.define('foods', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:  Sequelize.STRING,
        calories: Sequelize.INTEGER
     });
};