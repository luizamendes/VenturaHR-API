const { JobRepository } = require("../repositories/Job");
const { CompanyRepository } = require("../repositories/User");
const Job = require("../models/Job");

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async create(job, companyId) {
    try {
      const company = await CompanyRepository.getById(companyId);

      if (!company) {
        throw new Error("Empresa não existe");
      }

      job.criteriaList = JSON.stringify(job.criteriaList);

      return await this.repository.save(job, companyId);
    } catch (error) {
      throw new Error(`Service:: Erro ao criar vaga - ${error.message}`);
    }
  }

  // TODO: Refactor the parsing logic

  async getAll() {
    try {
      const jobs = await this.repository.getAll();

      return Job.parseJobsCriteria(jobs);
    } catch (error) {
      throw new Error(`Service:: Erro ao buscar vagas - ${error.message}`);
    }
  }

  async getLatest() {
    try {
      const jobs = await this.repository.getLatest();

      return Job.parseJobsCriteria(jobs);
    } catch (error) {
      throw new Error(
        `Service:: Erro ao buscar ultimas vagas - ${error.message}`
      );
    }
  }

  async getById(jobId) {
    try {
      const job = await this.repository.getById(jobId);
      job.criteriaList = JSON.parse(job.criteriaList);

      return job;
    } catch (error) {
      throw new Error(`Service:: Erro ao buscar vaga - ${error.message}`);
    }
  }
}

const JobService = new Service(JobRepository);

module.exports = { JobService };
