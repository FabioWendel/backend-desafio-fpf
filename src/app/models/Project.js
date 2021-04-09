import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        date_init: Sequelize.DATE,
        date_finish: Sequelize.DATE,
        value_project: Sequelize.DOUBLE,
        risk_project: Sequelize.INTEGER,
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
