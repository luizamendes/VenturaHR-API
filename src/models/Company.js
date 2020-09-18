const User = require("./User");

class Company extends User {
  constructor(args) {
    const { cnpj, companyName, ...user } = args;

    super(user);
    this.cnpj = cnpj;
    this.companyName = companyName;
  }
}

module.exports = Company;
