const express = require("express");
const router = express.Router();
const middleware = require("../../../middlware/validate.middlware");
const {verifyJWT} = require('../../../middlware/auth');
const { userValidator } = require("../../../validation");
const { 
    createUserController,
    loginUserController,
    updateUserController,
    deleteUserController
 } = require("../../../controller/user.controller");

module.exports = () => {
  router.post("/create",middleware(userValidator.createUser),createUserController);
  router.post("/login", middleware(userValidator.loginUser), loginUserController)
  router.patch('/update',verifyJWT(true), middleware(userValidator.updateUser), updateUserController);
  router.post('/delete', verifyJWT(), middleware(userValidator.deleteUser), deleteUserController)
  return router;
};
