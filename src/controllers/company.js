const express = require("express");
const authorizationtionFilter = require("../filters/authorization.js");
const { JobService } = require("../services/Job");

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

router.post("/company/job", authorizationtionFilter, async (req, res) => {
  console.log(2);
  const { job } = req.body;
  const { type, id } = req.session;

  if (type !== "Empresa") {
    return res.status(403).send("Forbidden");
  }

  if (!id) {
    return res.status(404).send("Bad request");
  }

  if (!job) {
    return res.status(400).send("Vaga é requerida");
  }

  try {
    const job = await JobService.create(job, id);
    res.status(201).send(job);
  } catch (error) {
    res.status(500).send("Erro ao criar vaga");
  }
});

module.exports = { router };
