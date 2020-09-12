const express = require("express");

const router = express.Router();

router.get("/user", (_, res) => {
  res.send("get user");
});

router.post("/user", (req, res) => {
  console.log("req.body", req.body);
  const { user } = req.body;

  if (!user) {
    return res.status(400).send({
      message: "User is required",
    });
  }

  console.log(user);
  res.send(user);
});

module.exports = { router };
