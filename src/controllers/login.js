const express = require("express");
const { CandidateService, CompanyService } = require("../services/User");
const hash = require("../utils/hash");
const { JWTData, generate } = require("../utils/token");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, loginType } = req.body;

  if (!email || !password) {
    return res.status(400).send("E-mail e senha são obrigatórios");
  }

  try {
    // Getting user
    let user;

    if (loginType && loginType === "Empresa") {
      user = await CompanyService.getByEmail(email);
    } else {
      user = await CandidateService.getByEmail(email);
    }

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    // Checking password
    const passwordMatch = await hash.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Password inválido");
    }

    // Generating JWT
    const JWTInfo = JWTData(user, loginType);

    const token = await generate(JWTInfo);

    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = { router };
