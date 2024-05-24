const express = require("express");
const router = express.Router();
module.exports = () => {
  router.use("/user", require("./user.route")(router))
  return router;
};
 