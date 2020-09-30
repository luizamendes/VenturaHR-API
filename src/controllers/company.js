const express = require("express");
const authorizationtionFilter = require("../filters/authorization.js");
const { JobService } = require("../services/Job");
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

router.post("/company/jobs", authorizationtionFilter, async (req, res) => {
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
    const createdJob = await JobService.create(job, id);

    res.status(201).send(createdJob);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao criar vaga");
  }
});

router.get("/company/jobs", authorizationtionFilter, async (req, res) => {
  const { type, id } = req.session;

  if (type !== "Empresa") {
    return res.status(403).send("Forbidden");
  }

  if (!id) {
    return res.status(404).send("Bad request");
  }

  try {
    const company = await CompanyService.getUserJobs(id);

    res.status(200).send(company.jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao obter vagas do usuário");
  }
});

module.exports = { router };
