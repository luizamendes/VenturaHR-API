const express = require("express");
const bodyParser = require("body-parser");
const controllerRegister = require("./controllers");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Controllers
controllerRegister(app);

app.listen(port, () => {
  console.log(`Magic happening on port ${port}`);
});
