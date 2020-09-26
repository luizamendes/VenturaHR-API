const express = require("express");
const { CandidateService, CompanyService } = require("../services/User");
const { JWTData, generate } = require("../utils/token");

const router = express.Router();

router.post("/job", async (req, res) => {
  const { job } = req.body;
  const { authorization } = req.headers;
});

module.exports = { router };
