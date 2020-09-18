const User = require("./User");

class Candidate extends User {
  constructor(args) {
    const { cpf, ...user } = args;

    super(user);
    this.cpf = cpf;
  }
}

module.exports = Candidate;
