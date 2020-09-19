const Company = require("../models/Company");
const hash = require("../utils/hash");

class CompanyRepository {
  async save(company) {
    try {
      company.password = await hash.make(company.password);
      await Company.create({ ...company });
    } catch (error) {
      console.log("error", error.message);
    }
  }

  async getAll() {
    try {
      return await Company.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    try {
      const user = await Company.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new CompanyRepository();
