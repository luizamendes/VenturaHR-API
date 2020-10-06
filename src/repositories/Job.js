// const redis = require("redis");
const Job = require("../models/Job");
const { Op } = require("sequelize");

class Repository {
  constructor(model) {
    this.model = model;
    // this.connection = redis.createClient(process.env.REDIS_PORT);
  }

  async save(job, userId) {
    try {
      const newJob = await this.model.create({ ...job, userId });
      // await this.connection.setex(newJob.dataValues.id, 3600, "mendes");
      return newJob;
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
      return await this.model.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
      });
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

  async getByQuery(query) {
    try {
      const jobs = await this.model.findAll({
        where: {
          [Op.or]: {
            name: { [Op.iLike]: `%${query}%` },
            description: { [Op.iLike]: `%${query}%` },
            company: { [Op.iLike]: `%${query}%` },
            city: { [Op.iLike]: `%${query}%` },
            state: { [Op.iLike]: `%${query}%` },
            contractType: { [Op.iLike]: `%${query}%` },
            contractDuration: { [Op.iLike]: `%${query}%` },
            openUntil: { [Op.iLike]: `%${query}%` },
            criteriaList: { [Op.iLike]: `%${query}%` },
          },
        },
      });

      return jobs;
    } catch (error) {
      throw new Error(`Repository:: Erro ao obter vagas - ${error.message}`);
    }
  }
}

const JobRepository = new Repository(Job);

module.exports = { JobRepository };
