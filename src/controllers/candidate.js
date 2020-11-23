const express = require("express");
const authorizationtionFilter = require("../filters/authorization.js");
const { UserService } = require("../services/User");
const ApplicationService = require("../services/Application");

const router = express.Router();

// Apply for job
router.post(
  "/candidates/application",
  authorizationtionFilter,
  async (req, res) => {
    try {
      const { type, id } = req.session;
      const { application, jobId } = req.body;

      if (type !== "Candidato") {
        return res
          .status(400)
          .send("Somente candidatos podem aplicar para vagas");
      }

      if (!application) {
        return res.status(400).send("Candidatura é requerida");
      }

      const newApplication = await ApplicationService.create(
        application,
        jobId,
        id
      );

      return res.status(201).send(newApplication);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

// Get jobs of candidate
router.get(
  "/candidates/application",
  authorizationtionFilter,
  async (req, res) => {
    try {
      const { id } = req.session;

      const candidate = await UserService.getCandidateApplications(id);

      return res.status(200).send(candidate.applications);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

router.get(
  "/candidates/application/:applicationId",
  //   authorizationtionFilter,
  async (req, res) => {
    const { applicationId } = req.params;

    try {
      const applications = await ApplicationService.getById(applicationId);

      return res.status(201).send(applications);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

module.exports = { router };
