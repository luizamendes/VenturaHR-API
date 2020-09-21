const express = require("express");
const { CompanyService } = require("../services/User");

const router = express.Router();

router.get("/company", async (_, res) => {
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

module.exports = { router };
