const express = require("express");

const router = express.Router();

router.get("/monitoring", (_, res) => {
  res.send("Hello world!");
});

module.exports = { router };
