const express = require("express");
const CompanyService = require("../services/Company");
const CandidateService = require("../services/Candidate");
const { JWTData, generate } = require("../utils/token");

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

router.post("/user", async (req, res) => {
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

  // Generating JWT
  const JWTInfo = JWTData(newUser, accountType);

  const token = await generate(JWTInfo);

  return res.status(201).send({ token });
});

module.exports = { router };
