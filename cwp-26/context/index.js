module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: { deletedAt: { $eq: null }}
            }
        }
    }
    const sequelize = new Sequelize(config.dbName, config.user, config.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Team = require('../models/team')(Sequelize, sequelize);
    const WorkPeriod = require('../models/workPeriod')(Sequelize, sequelize);
    const UsersTeams = require('../models/userTeams')(Sequelize, sequelize);

    User.belongsToMany(Team, {as: 'Teams', through: 'UsersTeams'});
    Team.belongsToMany(User, {as: 'Users', through: 'UsersTeams'});
    WorkPeriod.belongsTo(User, {foreignKey: 'userId', targetKey: 'id', as: 'User'});
    WorkPeriod.belongsTo(Team, {foreignKey: 'teamId', targetKey: 'id', as: 'Team'});

    return {
        users: User,
        teams: Team,
        workPeriods: WorkPeriod,

        Sequelize,
        sequelize,
    };
};