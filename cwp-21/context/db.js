const Office = require('../models/Office');
const Agent = require('../models/Agent');
const Properties = require('../models/Properties');

module.exports = (Sequelize, config,options)=>{
  const sequelize = new Sequelize(config.db.name,config.db.user,
      config.db.password,options);

const office = Office(Sequelize,sequelize);
const agent = Agent(Sequelize,sequelize);
const properties = Properties(Sequelize,sequelize);

agent.hasMany(properties,{as:'Prop'});
office.hasMany(agent,{as:"Agents"});


  return {
      office,
      agent,
      properties,
      sequelize,
      Sequelize,
  };
};