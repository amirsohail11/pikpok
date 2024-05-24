const express = require("express");
const router = express.Router();
const middleware = require("../middlware/validate.middlware");
const { userValidator } = require("../validation");
const { createUserController } = require("../controller/user.controller");

module.exports = () => {
  router.post("/create",middleware(userValidator.createUser),createUserController);
  return router;
};
