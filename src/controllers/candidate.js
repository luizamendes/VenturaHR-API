const express = require("express");
const authorizationtionFilter = require("../filters/authorization.js");
const { CandidateService } = require("../services/User");
const ApplicationService = require("../services/Application");

const router = express.Router();

// Get candidates
router.get("/candidates", async (_, res) => {
  try {
    const candidates = await CandidateService.getAll();

    if (!candidates.length) {
      return res.status(204);
    }

    return res.send(candidates);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Apply for job
router.post("/candidates/job", authorizationtionFilter, async (req, res) => {
  try {
    const { type, id } = req.session;
    const { application, jobId } = req.body;

    if (type !== "Candidato") {
      return res
        .status(400)
        .send("Somente candidatos podem aplicar para vagas");
    }

    if (!application) {
      return res.status(400).send("Candidatura é requerida");
    }

    const newApplication = await ApplicationService.create(
      application,
      jobId,
      id
    );

    return res.status(201).send(newApplication);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get jobs of candidate
router.get("/candidates/job", authorizationtionFilter, async (req, res) => {
  try {
    const { id } = req.session;

    const userJobs = await CandidateService.getUserJobs(id);

    return res.status(200).send(userJobs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = { router };
