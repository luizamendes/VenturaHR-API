const ApplicationRepository = require("../repositories/Application");
const { UserRepository } = require("../repositories/User");
const { JobRepository } = require("../repositories/Job");
const { calculateResult } = require("../models/Application");

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async create(application, jobId, candidateId) {
    try {
      const job = await JobRepository.getById(jobId);

      if (!job) {
        throw new Error("Vaga não encontrado");
      }

      // check on redis if job is still valid

      const candidate = await UserRepository.getById(candidateId);

      if (!candidate) {
        throw new Error("Candidato não encontrado");
      }

      const app = calculateResult(application.answers);

      return await this.repository.save(app, jobId, candidateId);
    } catch (error) {
      throw new Error(`Service:: Erro ao fazer candidatura - ${error.message}`);
    }
  }

  async getByCandidate(candidateId) {
    try {
      return await this.repository.getByCandidate(candidateId);
    } catch (error) {
      throw new Error(
        `Service:: Erro ao buscar candidatura - ${error.message}`
      );
    }
  }

  async getByJob(jobId) {
    try {
      return await this.repository.getByJob(jobId);
    } catch (error) {
      throw new Error(
        `Service:: Erro ao buscar candidatura - ${error.message}`
      );
    }
  }

  async getById(applicationId) {
    try {
      return await this.repository.getById(applicationId);
    } catch (error) {
      throw new Error(
        `Service:: Erro ao buscar candidatura - ${error.message}`
      );
    }
  }
}

module.exports = new Service(ApplicationRepository);
