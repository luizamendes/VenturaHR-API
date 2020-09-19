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

  // constructor(args) {
  //   const {
  //     id,
  //     name,
  //     email,
  //     address,
  //     phone,
  //     password,
  //     cnpj,
  //     companyName,
  //   } = args;

  //   this.id = id;
  //   this.name = name;
  //   this.email = email;
  //   this.address = address;
  //   this.phone = phone;
  //   this.password = password;
  //   this.cnpj = cnpj;
  //   this.companyName = companyName;
  // }
}

module.exports = Company;
