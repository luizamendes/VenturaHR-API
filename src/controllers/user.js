const express = require("express");
const { UserService } = require("../services/User");
const { JWTData, generate } = require("../utils/token");

const router = express.Router();

// Registering user
router.post("/user", async (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).send({
      message: "User is required",
    });
  }

  try {
    const { accountType } = user;
    const newUser = await UserService.create(user);

    // Generating JWT
    const JWTInfo = JWTData(newUser, accountType);

    const token = await generate(JWTInfo);

    return res.status(201).send({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = { router };
