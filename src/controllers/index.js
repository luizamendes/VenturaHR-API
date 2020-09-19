const controllers = [
  require("./monitoring"),
  require("./user"),
  require("./login"),
];

const controllerRegister = (application) => {
  controllers.forEach((controller) => {
    application.use("", controller.router);
  });
};

module.exports = controllerRegister;
