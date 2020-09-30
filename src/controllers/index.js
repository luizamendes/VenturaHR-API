const controllers = [
  require("./monitoring"),
  require("./user"),
  require("./login"),
  require("./company"),
  require("./candidate"),
  require("./jobs"),
];

const controllerRegister = (application) => {
  controllers.forEach((controller) => {
    application.use("", controller.router);
  });
};

module.exports = controllerRegister;
