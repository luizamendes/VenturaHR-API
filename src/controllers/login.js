const express = require("express");
const { UserService } = require("../services/User");
const hash = require("../utils/hash");
const { JWTData, generate } = require("../utils/token");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("E-mail e senha são obrigatórios");
  }

  try {
    // Getting user
    const user = await UserService.getByEmail(email);

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    // Checking password
    const passwordMatch = await hash.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Password inválido");
    }

    // Generating JWT
    const { accountType } = user;
    const JWTInfo = JWTData(user, accountType);

    const token = await generate(JWTInfo);

    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = { router };
