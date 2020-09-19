const express = require("express");
const CompanyService = require("../services/Company");
const CandidateService = require("../services/Candidate");

const router = express.Router();

router.get("/user", async (_, res) => {
  try {
    const companies = await CompanyService.getAll();

    if (!companies.length) {
      return res.status(204);
    }

    return res.send(companies);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/user", (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).send({
      message: "User is required",
    });
  }

  const { accountType } = user;
  let newUser;

  if (accountType && accountType === "Empresa") {
    newUser = CompanyService.create(user);
  } else {
    newUser = CandidateService.create(user);
  }

  res.status(201).send(newUser);
});

module.exports = { router };
