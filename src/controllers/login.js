const express = require("express");
const CompanyService = require("../services/Company");
const CandidateService = require("../services/Candidate");
const hash = require("../utils/hash");
const { generate } = require("../utils/token");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, loginType } = req.body;

  // Validate input

  // Getting user
  let user;

  if (loginType && loginType === "Empresa") {
    user = await CompanyService.getByEmail(email);
  } else {
    console.log("not implemented");
  }

  if (!user) {
    return res.status(404).send("Usuário não existe");
  }

  // Checking password
  const passwordMatch = await hash.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send("Password incorreto");
  }

  // Generating JWT
  const JWTData = {
    iss: "venturahr-api",
    sub: user.id,
    loginType,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  };

  const token = await generate(JWTData);

  res.status(200).send({ token });
});

module.exports = { router };
