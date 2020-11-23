const express = require("express");
const authorizationtionFilter = require("../filters/authorization.js");
const ApplicationService = require("../services/Application");

const router = express.Router();

router.get(
  "/applications/:jobId",
  //   authorizationtionFilter,
  async (req, res) => {
    const { jobId } = req.params;
    // const { type, id } = req.session;

    // if (type !== "Empresa") {
    //   return res.status(400).send("");
    // }

    try {
      const applications = await ApplicationService.getByJob(jobId);

      return res.status(201).send(applications);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

module.exports = { router };
