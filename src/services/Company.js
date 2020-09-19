const CompanyRepository = require("../repositories/Company");
const Company = require("../models/Company");

class CompanyService {
  static async create(user) {
    if (!user) {
      return null;
    }

    try {
      return CompanyRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll() {
    try {
      const companies = await CompanyRepository.getAll();

      return companies;
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getByEmail(email) {
    try {
      return await CompanyRepository.getByEmail(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CompanyService;
