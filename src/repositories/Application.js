const Application = require("../models/Application");

class Repository {
  constructor(model) {
    this.model = model;
  }

  // Create application
  async save(application, jobId, candidateId) {
    try {
      return await this.model.create({ ...application, jobId, candidateId });
    } catch (error) {
      throw new Error(
        `Repository:: Erro ao criar candidatura - ${error.message}`
      );
    }
  }

  // Get all applications of candidate
  async getByCandidate(candidateId) {
    try {
      return await this.model.findAll({
        where: {
          candidateId,
        },
      });
    } catch (error) {
      throw new Error(
        `Repository:: Erro ao obter candidaturas - ${error.message}`
      );
    }
  }

  // Get all applications of job
  async getByJob(jobId) {
    try {
      return await this.model.findAll({
        where: {
          jobId,
        },
      });
    } catch (error) {
      throw new Error(
        `Repository:: Erro ao obter candidaturas - ${error.message}`
      );
    }
  }

  // Get by application id
  async getById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw new Error(
        `Repository:: Erro ao obter candidatura - ${error.message}`
      );
    }
  }
}

module.exports = new Repository(Application);