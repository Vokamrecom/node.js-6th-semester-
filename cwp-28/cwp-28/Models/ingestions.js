module.exports = (Sequelize, sequelize) => {
    return sequelize.define('ingestions',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            when: {
                type: Sequelize.DATE
            }
        });
};