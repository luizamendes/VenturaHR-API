const User = require("../models/User");
const hash = require("../utils/hash");

class Repository {
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

  async getCompanyJobs(id) {
    try {
      const jobs = await this.model.findByPk(id, {
        include: { association: "jobs" },
      });

      return jobs;
    } catch (error) {
      throw new Error(
        `Repository:: Erro ao obter vagas do usuário - ${error.message}`
      );
    }
  }
  async getCandidateApplications(id) {
    try {
      const jobs = await this.model.findByPk(id, {
        include: {
          association: "applications",
          include: { association: "application" },
        },
      });

      return jobs;
    } catch (error) {
      throw new Error(
        `Repository:: Erro ao obter vagas do usuário - ${error.message}`
      );
    }
  }
}

const UserRepository = new Repository(User);

module.exports = { UserRepository };
