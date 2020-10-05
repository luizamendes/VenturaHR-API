const express = require("express");
const { CandidateService } = require("../services/User");

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
router.post("candidates/job", async (req, res) => {
  try {
    const { application } = req.body;

    if (!application) {
      return res.status(400).send("Candidatura é requerida");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = { router };
