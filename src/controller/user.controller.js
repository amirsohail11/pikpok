const { success, failure } = require("../util/response.util");
const { serverResponseMessage } = require("../constants/index");
const { Counter } = require("../models/index");
const {
  userCreate,
  userUpdate,
  userFind
} = require("../service/user.service");
const { getNextSequenceValue } = require("../util/common.util");
const logger = require("../util/logger.util");
const {generateJWT} = require("../middlware/auth")
const bcrypt = require('bcrypt');

exports.createUserController = async (req, res) => {
    try {
      const existingUser = await userFind({ email: req.body.email });
      if (existingUser) {
        if (existingUser.is_deleted) {
          const updatedUser = await userUpdate({
            _id: existingUser._id,
            is_deleted: false,
          });
          return success(res, 200, serverResponseMessage.USER_REACTIVATED, updatedUser);
        }
        return success(res, 200, serverResponseMessage.USER_ALREADY_EXISTS);
      }
      const id = await getNextSequenceValue('userId',Counter);
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const Response = await userCreate({
        userId: id,
        ...req.body,
        password: hashedPassword,
      });
      if (Response)
        return success(res, 200, serverResponseMessage.USER_CREATED, Response);
      else
        return success(res, 204, serverResponseMessage.DATA_READ_ERROR);
    } catch (error) {
      logger.error(
        `[createUserController] [Error] while creating user=> ${error}`
      );
      return failure(res, 204, serverResponseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.loginUserController = async (req, res) => {
  try {
    const user = await userFind({ email: req.body.email });
    const isMatch = user && req.body.password ? await bcrypt.compare(req.body.password, user.password || '') : false;
    if ( !user || user.is_deleted === true || !isMatch) {
      return failure(res, 401, serverResponseMessage.INVALID_CREDENTIALS);
    }
    const token = generateJWT(user._id);
    return success(res, 200, serverResponseMessage.LOGIN_SUCCESS, { token });
  } catch (error) {
    logger.error(`[loginUserController] [Error] while logging in user=> ${error}`);
    return failure(res, 500, serverResponseMessage.ERROR, error.message);
  }
};

exports.updateUserController = async (req, res) => {
  try {
    if(req.body.userId === req.body._id){
      const isExist = await userFind({_id: req.body._id})
      if(!isExist){
        return success(res, 200, serverResponseMessage.NO_USER_FOUND);
      }
      const Response = await userUpdate(req.body);
      if (Response){
        return success(res, 200, serverResponseMessage.USER_UPDATED, Response);
      }
    }
    else return success(res, 204, serverResponseMessage.YOU_CAN_NOT_UPDATE_OTHER_DETAILS);
  } catch (error) {
    logger.error(`[updateUserController] [Error] while updating user=> ${error}`);
    return failure(res, 500, serverResponseMessage.INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.deleteUserController = async (req, res) => {
  try {
    const isExist = await userFind({_id: req.body._id})
    if (!isExist || isExist.is_deleted === true) {
      return failure(res, 404, serverResponseMessage.NO_USER_FOUND);
    }
    const user = await userUpdate({
      _id: req.body._id,
      is_deleted: true
  });
  return success(res, 200, serverResponseMessage.USER_DELETED, { user });
  } catch (error) {
    logger.error(`[deleteUserController] [Error] while deleting user=> ${error}`);
    return failure(res, 500, serverResponseMessage.ERROR, error.message);
  }
};