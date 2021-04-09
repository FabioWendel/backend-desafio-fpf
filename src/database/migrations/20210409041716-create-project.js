module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateInit: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateFinish: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valueProject: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      riskProject: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('projects');
  },
};
