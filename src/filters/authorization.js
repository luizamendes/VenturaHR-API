const { verify } = require("../utils/token");

const authorization = async (req, res, next) => {
  const { authorization: jwtToken } = req.headers;

  if (!jwtToken) {
    return res.status(401).send("JWT Token é requerido");
  }

  console.log("authorization -> authorizationHeader", jwtToken);

  await verify(jwtToken)
    .then((token) => {
      const { accountType, sub } = token;
      console.log(token);
      req.session = { type: accountType, id: sub };
      next();
    })
    .catch(() => {
      res.status(401).send("JWT Token inválido");
    });
};

module.exports = authorization;
