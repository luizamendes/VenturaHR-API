// var moment = require("moment");
const { JobRepository } = require("../repositories/Job");
const { UserRepository } = require("../repositories/User");
const Job = require("../models/Job");

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async create(job, userId) {
    try {
      const company = await UserRepository.getById(userId);

      if (!company) {
        throw new Error("Empresa não existe");
      }

      job.criteriaList = JSON.stringify(job.criteriaList);

      // const today = moment();
      // const endDate = moment(job.openUntil);
      // const expiresIn = endDate.add(2, "days");
      // const expirationMinutes = moment
      //   .duration(expiresIn.diff(today))
      //   .asSeconds();

      return await this.repository.save(job, userId);
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

  async getLatest(qty) {
    try {
      const jobs = await this.repository.getLatest(qty);

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

  async getByQuery(query) {
    try {
      const jobs = await this.repository.getByQuery(query);

      return Job.parseJobsCriteria(jobs);
    } catch (error) {
      throw new Error(`Service:: Erro ao buscar vagas - ${error.message}`);
    }
  }
}

const JobService = new Service(JobRepository);

module.exports = { JobService };
