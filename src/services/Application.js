const ApplicationRepository = require("../repositories/Application");
const { UserRepository } = require("../repositories/User");
const { JobRepository } = require("../repositories/Job");
const CriteriaCalculator = require("../models/CriteriaCalculator");
class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async create(application, jobId, candidateId) {
    console.log("Service -> create -> application", application);
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

      const calculator = new CriteriaCalculator(
        JSON.parse(application.answers),
        "application"
      );
      calculator.calculateResult();
      application.result = calculator.result;

      return await this.repository.save(application, jobId, candidateId);
    } catch (error) {
      console.log("Service -> create -> error", error);
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
