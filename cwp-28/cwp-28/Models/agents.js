module.exports = (Sequelize, sequelize) => {
    return sequelize.define('agents', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        callsign: Sequelize.STRING
    });
};