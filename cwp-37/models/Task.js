module.exports = (Sequelize, sequelize) => {
  return sequelize.define('task', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      text: {
        type: Sequelize.STRING
      },
      completed : {
        type: Sequelize.BOOLEAN
      }
  });
};