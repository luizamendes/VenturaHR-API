const CandidateRepository = require("../repositories/Candidate");
const Candidate = require("../models/Candidate");

class CandidateService {
  static async create(user) {
    if (!user) {
      return null;
    }

    const candidate = new Candidate(user);

    return CandidateRepository.save(candidate);
  }
}

module.exports = CandidateService;
