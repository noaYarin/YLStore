const itemRoutes = require("express").Router(),
  _ = require("lodash"),
  userAuth = require("../services/auth"),
  logger = require("../services/logger");

const {
  getAllItems,
  insertItem,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

itemRoutes.get("/getAllItems", (req, res) => {
  getAllItems()
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.json(err);
    });
});

itemRoutes.post("/addItem", userAuth.verifyToken, (req, res) => {
  if (!res.locals.decodedToken.isAdmin) {
    return res.status(403).json("Not a admin user");
  }
  insertItem(req.body)
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(500).send(err);
    });
});

itemRoutes.get("/getItem/:id", (req, res) => {
  getItem(req.params.id)
    .then((item) => res.status(200).json(item._doc))
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(500).json(err);
    });
});

itemRoutes.put("/updateItem/:id", userAuth.verifyToken, (req, res) => {
  if (!res.locals.decodedToken.isAdmin) {
    return res.status(403).send("Not a admin user");
  }
  let { id } = req.params;
  updateItem(id, req.body)
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(400).send(err);
    });
});

itemRoutes.delete("/deleteItem/:id", userAuth.verifyToken, (req, res) => {
  if (!res.locals.decodedToken.isAdmin) {
    return res.status(403).json("Not a admin user");
  }
  deleteItem(req.params.id)
    .then((item) => res.status(200).send(item))
    .catch((err) => res.status(401).send(err));
});

module.exports = itemRoutes;
