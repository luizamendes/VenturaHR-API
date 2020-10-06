const ApplicationRepository = require("../repositories/Application");
const { CandidateRepository } = require("../repositories/User");
const { JobRepository } = require("../repositories/Job");

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

      const candidate = await CandidateRepository.getById(candidateId);

      if (!candidate) {
        throw new Error("Candidato não encontrado");
      }

      return await this.repository.save(application, jobId, candidateId);
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
