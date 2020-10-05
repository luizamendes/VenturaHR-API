const { Model, DataTypes } = require("sequelize");

class Candidate extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        cpf: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Application, {
      foreignKey: "candidateId",
      as: "jobs",
    });
  }
}

module.exports = Candidate;
