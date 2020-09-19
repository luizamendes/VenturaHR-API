const JWT = require("jsonwebtoken");

const generate = (payload) => {
  return new Promise((resolve) => {
    JWT.sign(
      payload,
      process.env.SECRET_KEY,
      { algorithm: "HS256" },
      (err, token) => {
        if (err) {
          console.log(err.message);
          throw new Error("Error Invalid Token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generate,
};
