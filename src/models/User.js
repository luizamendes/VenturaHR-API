const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        accountType: DataTypes.STRING,
        password: DataTypes.STRING,
        cpf: DataTypes.STRING,
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
      foreignKey: "userId",
      as: "jobs",
    });
    this.hasMany(models.Application, {
      foreignKey: "userId",
      as: "applications",
    });
  }
}

module.exports = User;
