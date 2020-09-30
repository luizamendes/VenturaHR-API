const Job = require("../models/Job");

class Repository {
  constructor(model) {
    this.model = model;
  }

  async save(job, companyId) {
    try {
      return await this.model.create({ ...job, companyId });
    } catch (error) {
      throw new Error(`Repository:: Erro ao criar vaga - ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(`Repository:: Erro ao obter vagas - ${error.message}`);
    }
  }

  async getLatest() {
    try {
      return await this.model.findAndCountAll({ limit: 10 });
    } catch (error) {
      throw new Error(
        `Repository:: Erro ao obter ultimas vagas - ${error.message}`
      );
    }
  }

  async getByPublisher(companyId) {
    try {
      const jobs = await this.model.findAll({
        where: {
          companyId,
        },
      });

      return jobs;
    } catch (error) {
      throw new Error(`Repository:: Erro ao obter vagas - ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const job = await this.model.findByPk(id);

      return job;
    } catch (error) {
      throw new Error(`Repository:: Erro ao obter vaga - ${error.message}`);
    }
  }
}

const JobRepository = new Repository(Job);

module.exports = { JobRepository };
