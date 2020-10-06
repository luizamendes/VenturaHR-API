const { Model, DataTypes } = require("sequelize");

class Job extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        company: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        contractType: DataTypes.STRING,
        contractDuration: DataTypes.STRING,
        openUntil: DataTypes.STRING,
        criteriaList: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "publisher",
    });
    this.hasMany(models.Application, {
      foreignKey: "jobId",
      as: "applicant",
    });
  }

  static parseJobsCriteria(jobs) {
    return jobs.map((job) => {
      job.dataValues.criteriaList = JSON.parse(job.dataValues.criteriaList);

      return job;
    });
  }
}

module.exports = Job;
