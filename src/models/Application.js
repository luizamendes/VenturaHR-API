const { Model, DataTypes } = require("sequelize");

class Application extends Model {
  static init(connection) {
    super.init(
      {
        answers: DataTypes.STRING,
        result: DataTypes.DECIMAL,
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Candidate, {
      foreignKey: "candidateId",
      as: "applicant",
    });
    this.belongsTo(models.Job, {
      foreignKey: "jobId",
      as: "application",
    });
  }
}

module.exports = Application;
