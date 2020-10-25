const express = require("express");
const authorizationtionFilter = require("../filters/authorization.js");
const { JobService } = require("../services/Job");

const router = express.Router();

// Get all jobs
router.get("/jobs", authorizationtionFilter, async (_, res) => {
  try {
    const jobs = await JobService.getAll();

    res.status(200).send(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao obter vagas");
  }
});

// Get latest jobs
router.get("/jobs/latest/:qty", async (req, res) => {
  const { qty } = req.params;

  try {
    const jobs = await JobService.getLatest(qty);

    res.status(200).send(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao obter vagas");
  }
});

// Get job by query
router.get("/jobs/search/:query", authorizationtionFilter, async (req, res) => {
  const { query } = req.params;

  try {
    if (!query) {
      const allJobs = await JobService.getAll();

      return res.status(200).send(allJobs);
    }

    const queryJobs = await JobService.getByQuery(query);

    res.status(200).send(queryJobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao obter vaga");
  }
});

// Get job by id
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
