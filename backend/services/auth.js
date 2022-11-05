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
  if (!req.headers.authorization) {
    logger.error("Not authorized, access denied");
    return res.status(401);
  }
  try {
    token = req.headers["authorization"].replace("Bearer ", "");
    userData = jwt.verify(token, secretKey);
    res.locals.decodedToken = userData;
    return next();
  } catch (err) {
    logger.info(`Token failed + ${err}`);
    return res.status(401);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
