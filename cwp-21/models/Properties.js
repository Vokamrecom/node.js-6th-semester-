module.exports = (Sequelize, sequelize)=>{
    return sequelize.define('property',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        heading:{
            type:Sequelize.STRING,
        },
        price:{
            type: Sequelize.INTEGER,
        },
        currency:{
            type: Sequelize.STRING,
        },
        location:{
            type: Sequelize.STRING,
        },
    });
};