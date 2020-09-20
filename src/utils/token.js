const JWT = require("jsonwebtoken");

const JWTData = (user, accountType) => ({
  iss: "venturahr-api",
  sub: user.id,
  accountType,
  exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
});

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
  JWTData,
  generate,
};
