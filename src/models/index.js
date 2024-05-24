const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const config = require("../config/db.config");
const logger  =require("../util/logger.util")

mongoose.set("strictQuery", false);
mongoose
  .connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`Connected to MongoDB`);
  })
  .catch((e) => {
    logger.info(`Could not init db\n${e.trace}`);
  });

module.exports = {
  Counter: mongoose.models.Counter || require("./counter.model")(mongoose),
  User: mongoose.models.User || require("./user.model")(mongoose),
};
