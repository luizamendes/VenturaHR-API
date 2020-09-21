const express = require("express");
const { CandidateService, CompanyService } = require("../services/User");
const { JWTData, generate } = require("../utils/token");

const router = express.Router();

router.post("/user", async (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).send({
      message: "User is required",
    });
  }

  try {
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
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = { router };
