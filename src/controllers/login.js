const express = require("express");
const CompanyService = require("../services/Company");
const CandidateService = require("../services/Candidate");
const hash = require("../utils/hash");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, loginType } = req.body;

  let user;

  if (loginType && loginType === "Empresa") {
    user = await CompanyService.getByEmail(email);
  } else {
    console.log("not implemented");
  }

  if (!user) {
    return res.status(404).send("Usuário não existe");
  }

  const passwordMatch = await hash.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send("Password incorreto");
  }

  res.status(201).send(user);
});

module.exports = { router };
