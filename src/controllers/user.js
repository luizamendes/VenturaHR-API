const express = require("express");
const CompanyService = require("../services/Company");
const CandidateService = require("../services/Candidate");

const router = express.Router();

router.get("/user", (_, res) => {
  res.send("get user");
});

router.post("/user", (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).send({
      message: "User is required",
    });
  }

  const { accountType } = user;

  if (accountType && accountType === "Empresa") {
    CompanyService.create(user);
  } else {
    CandidateService.create(user);
  }

  res.status(201).send();
});

module.exports = { router };
