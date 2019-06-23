module.exports = (Sequelize, sequelize) => {
    return sequelize.define('persons',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name:  Sequelize.STRING,
            address:  Sequelize.STRING,
            isAlive:  Sequelize.BOOLEAN
        });
};