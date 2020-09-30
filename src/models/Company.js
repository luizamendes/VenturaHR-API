const { Model, DataTypes } = require("sequelize");

class Company extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        companyName: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Job, {
      foreignKey: "companyId",
      as: "jobs",
    });
  }
}

module.exports = Company;
