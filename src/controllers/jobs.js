const express = require("express");
const authorizationtionFilter = require("../filters/authorization.js");
const { JobService } = require("../services/Job");

const router = express.Router();

router.get("/jobs", authorizationtionFilter, async (_, res) => {
  try {
    const jobs = await JobService.getAll();

    res.status(200).send(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao obter vagas");
  }
});

router.get("/jobs/latest", async (_, res) => {
  try {
    const jobs = await JobService.getAll();

    res.status(200).send(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao obter vagas");
  }
});

router.get("/jobs/:id", authorizationtionFilter, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Id é requerido");
  }

  try {
    const job = await JobService.getById(id);

    res.status(200).send(job);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao obter vaga");
  }
});

module.exports = { router };
