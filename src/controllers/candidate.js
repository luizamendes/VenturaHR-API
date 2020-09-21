const express = require("express");
const { CandidateService } = require("../services/User");

const router = express.Router();

router.get("/candidate", async (_, res) => {
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

module.exports = { router };
