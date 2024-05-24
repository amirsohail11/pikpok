const { success, failure } = require("../util/response.util");
const { serverResponseMessage } = require("../constants/index");
const { Counter } = require("../models/index");
const {
  userCreate,
} = require("../service/user.service");
const { getNextSequenceValue } = require("../util/common.util");
const logger = require("../util/logger.util");

exports.createUserController = async (req, res) => {
    try {
      //get the next value of "userId"
      const id = await getNextSequenceValue('userId',Counter);
      const Response = await userCreate({
        userId: id,
        ...req.body,
      });
      if (Response)
        return success(res, 200, serverResponseMessage.USER_CREATED, Response);
      else
        return success(res, 204, serverResponseMessage.FAILURE_DATA_CREATE, err);
    } catch (error) {
      logger.error(
        `[createUserController] [Error] while creating user=> ${error}`
      );
      return failure(res, 204, serverResponseMessage.ERROR, error.message);
    }
  };