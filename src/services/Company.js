const CompanyRepository = require("../repositories/Company");
const Company = require("../models/Company");

class CompanyService {
  static async create(user) {
    if (!user) {
      return null;
    }

    const company = new Company(user);

    return CompanyRepository.save(company);
  }
}

module.exports = CompanyService;
