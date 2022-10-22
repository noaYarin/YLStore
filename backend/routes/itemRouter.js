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
      res.status(200).json(items);
    })
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.json(err);
    });
});

itemRoutes.post("/addItem", userAuth.verifyToken, (req, res) => {
  insertItem(req.body, res.locals.decodedToken.isAdmin)
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(500).json(err);
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
  let { id } = req.params;
  updateItem(id, res.locals.decodedToken, req.body)
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      logger.error(`There is an error on ${req.baseUrl} url + ${err}`);
      res.status(400).json(err);
    });
});

itemRoutes.delete("/deleteItem/:id", userAuth.verifyToken, (req, res) => {
  deleteItem(req.params.id, res.locals.decodedToken)
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(401).json(err));
});

module.exports = itemRoutes;
