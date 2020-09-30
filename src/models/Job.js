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
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "publisher",
    });
  }
}

module.exports = Job;
