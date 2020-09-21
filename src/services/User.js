const {
  CandidateRepository,
  CompanyRepository,
} = require("../repositories/User");

class UserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(user) {
    if (!user) {
      return null;
    }

    try {
      return this.usersRepository.save(user);
    } catch (error) {
      throw new Error(`Service Erro ao criar usuário - ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await this.usersRepository.getAll();
    } catch (error) {
      throw new Error(`Service Erro ao recuperar usuários - ${error.message}`);
    }
  }

  async getByEmail(email) {
    try {
      return await this.usersRepository.getByEmail(email);
    } catch (error) {
      throw new Error(`Service Erro ao recuperar usuário - ${error.message}`);
    }
  }
}

const CandidateService = new UserService(CandidateRepository);
const CompanyService = new UserService(CompanyRepository);

module.exports = { CompanyService, CandidateService };
