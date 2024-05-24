const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/db.config.js");
const router = express.Router();
const logger = require("./util/logger.util.js");

app.get("/", (req, res) => {
  res.send("App started...");
});

const allowedOrigins = ["*"];
app.use(cors({ allowedOrigins }));

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", require("./route/api/v1")(router));

express().use(app).listen(config.port, () => logger.info(`Listening on Port: ${config.port}`));
