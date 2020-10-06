const { UserRepository } = require("../repositories/User");

class Service {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(user) {
    if (!user) {
      return null;
    }

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`Service:: Erro ao criar usuário - ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await this.usersRepository.getAll();
    } catch (error) {
      throw new Error(
        `Service:: Erro ao recuperar usuários - ${error.message}`
      );
    }
  }

  async getByEmail(email) {
    try {
      return await this.usersRepository.getByEmail(email);
    } catch (error) {
      throw new Error(`Service:: Erro ao recuperar usuário - ${error.message}`);
    }
  }

  /* 
    For companies return jobs that the company has created
    For candidates return jobs that the candidate has applied to
  */
  async getCompanyJobs(id) {
    try {
      return await this.usersRepository.getUserJobs(id);
    } catch (error) {
      throw new Error(
        `Service:: Erro ao recuperar vagas do usuário - ${error.message}`
      );
    }
  }
  async getCandidateApplications(id) {
    try {
      return await this.usersRepository.getUserApplications(id);
    } catch (error) {
      throw new Error(
        `Service:: Erro ao recuperar vagas do usuário - ${error.message}`
      );
    }
  }
}

const UserService = new Service(UserRepository);

module.exports = { UserService };
