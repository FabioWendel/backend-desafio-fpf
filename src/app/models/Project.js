import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        dateInit: Sequelize.DATE,
        dateFinish: Sequelize.DATE,
        valueProject: Sequelize.DOUBLE,
        riskProject: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Participant, {
      foreignKey: 'project_id',
      as: 'projects',
    });

    this.hasMany(models.Participant, {
      foreignKey: 'project_id',
      as: 'participants',
    });
  }
}

export default Project;
