module.exports = (Sequelize, sequelize)=>{
    return sequelize.define('agent', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:Sequelize.STRING,
        },
        email:{
            type:Sequelize.STRING,
        },
        tel:{
            type:Sequelize.STRING,
        },
    });
};