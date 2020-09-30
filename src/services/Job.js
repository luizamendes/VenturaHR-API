const { JobRepository } = require("../repositories/Job");
const { CompanyRepository } = require("../repositories/User");

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(job, companyId) {
    try {
      const company = await CompanyRepository.getById(companyId);

      if (!company) {
        throw new Error("Empresa não existe");
      }

      return await this.repository.save(job, companyId);
    } catch (error) {
      throw new Error(`Service:: Erro ao criar vaga - ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error(`Service:: Erro ao buscar vagas - ${error.message}`);
    }
  }

  async getByPublisher(companyId) {
    try {
      return await this.repository.getByPublisher(companyId);
    } catch (error) {
      throw new Error(`Service:: Erro ao buscar vagas - ${error.message}`);
    }
  }

  async getById(jobId) {
    try {
      return await this.repository.getById(jobId);
    } catch (error) {
      throw new Error(`Service:: Erro ao buscar vaga - ${error.message}`);
    }
  }
}

const JobService = new UserService(JobRepository);

module.exports = { JobService };
