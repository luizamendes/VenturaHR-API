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

  static calculateResult(answers) {
    const answersArr = JSON.parse(answers);
    const totalResult = answersArr.reduce((acc, crr) => {
      return acc + crr.weigth * crr.applicantAnswer;
    }, 0);
    const weightSum = answersArr.reduce((acc, crr) => {
      return acc + crr.weigth;
    }, 0);

    const media = totalResult / weightSum;

    return { answers, result: media };
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "applicant",
    });
    this.belongsTo(models.Job, {
      foreignKey: "jobId",
      as: "application",
    });
  }
}

module.exports = Application;
