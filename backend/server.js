require("dotenv").config();
const express = require("express");
app = express();
(mongoose = require("mongoose")),
  (host = process.env.HOST || "localhost"),
  (port = 3000 || process.env.PORT),
  (dbhost = process.env.DBHOST || "mongodb://0.0.0.0:27017"),
  (logger = require("./services/logger")),
  ((itemRouter = require("./routes/itemRouter")),
  (userRouter = require("./routes/userRouter")));

//Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Middlewars
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//Routes
app.use("/user", userRouter);
app.use("/item", itemRouter);

mongoose
  .connect(`${dbhost}/clothingStore`)
  .then(() => {
    app.listen(port, () => {
      logger.info(`server start listening on port ${port}`);
    });
  })
  .catch((err) => logger.error(err));
