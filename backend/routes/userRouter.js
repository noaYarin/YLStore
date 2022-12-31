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
      res.status(400).send(err);
    });
});

userRouter.post("/signIn", (req, res) => {
  signIn(req.body)
    .then((userObject) => {
      res.status(200).send({ user: userObject.user, token: userObject.token });
    })
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(400).send(err);
    });
});

module.exports = userRouter;
