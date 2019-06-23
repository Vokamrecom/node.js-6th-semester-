module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize(config.db.name,
        config.db.user, config.db.password,{
            host: config.db.host,
            dialect: 'mysql',
            logging: false,
            define: {
                timestamps: true,
                paranoid: true,
                defaultScope: {
                    where: { deletedAt: { $eq: null } }
                }
            }
        });

    const Agents = require("../Models/agents")(Sequelize, sequelize);
    const Foods = require("../Models/foods")(Sequelize, sequelize);
    const Ingestions = require("../Models/ingestions")(Sequelize, sequelize);
    const Persons = require("../Models/persons")(Sequelize, sequelize);

    Ingestions.belongsTo(Agents, {
        as: "agent",
        foreignKey: "reportedById"
    });
    Ingestions.belongsTo(Foods, {
        as: "food",
        foreignKey: "foodId"
    });
    Ingestions.belongsTo(Persons, {
        as: "person",
        foreignKey: "personId"
    });

    return {
        Agents,
        Foods,
        Ingestions,
        Persons,
        sequelize,
        Sequelize
    };
};
