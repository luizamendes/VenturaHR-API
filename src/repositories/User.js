const Company = require("../models/Company");
const Candidate = require("../models/Candidate");
const hash = require("../utils/hash");

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async save(user) {
    try {
      user.password = await hash.make(user.password);
      return await this.model.create({ ...user });
    } catch (error) {
      throw new Error(`Repository:: Erro ao salvar usuário - ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(`Repository:: Erro ao obter usuários - ${error.message}`);
    }
  }

  // TODO: Specification Pattern - ver como implementar melhor essas buscas
  async getByEmail(email) {
    try {
      const user = await this.model.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Repository:: Erro ao obter usuário - ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const user = await this.model.findByPk(id);

      return user;
    } catch (error) {
      throw new Error(`Repository:: Erro ao obter usuário - ${error.message}`);
    }
  }
}

const CandidateRepository = new UserRepository(Candidate);
const CompanyRepository = new UserRepository(Company);

module.exports = { CompanyRepository, CandidateRepository };
