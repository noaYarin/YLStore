require("dotenv").config();
const _ = require("lodash"),
  logger = require("../services/logger"),
  jwt = require("jsonwebtoken");

const generateToken = (user) => {
  let secretKey = process.env.SECRET_KEY;
  _.unset(user._doc, "password");
  let token = jwt.sign({ ...user._doc }, secretKey);
  return token;
};

const verifyToken = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  if (req.headers.authorization.startWith("Bearer")) {
    token = req.headers.authorization.split("")[1];
    jwt
      .verify(token, secretKey, { ignoreExpiration: true })
      .then((userData) => {
        res.locals.decodedToken = userData;
        next();
      })
      .catch((error) => {
        logger.info(`Token failed + ${error}`);
        res.status(401);
      });
  } else {
    logger.error("Not authorized, access denied");
    res.status(401);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
