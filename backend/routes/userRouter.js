const express = require("express"),
  userRouter = express.Router(),
  logger = require("../services/logger"),
  userAuth = require("../services/auth"),
  { signUp, signIn } = require("../controllers/userController");

userRouter.post("/signUp", (req, res) => {
  signUp(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(400).json(err);
    });
});

userRouter.post("/signIn", userAuth.verifyToken, (req, res) => {
  signIn(req.body)
    .then((token) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(400).json(err);
    });
});

module.exports = userRouter;
