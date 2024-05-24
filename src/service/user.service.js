const { ObjectId } = require("mongoose").Types;
const { User } = require("../models/index");
RegExp.escape = function (s) {
  return s.replace(/[\\^$*+?.()|[\]{}-]/g, "\\$&");
};

exports.userCreate = async (req) => {
  try {
    return await User.create(req);
  } catch (error) {
    throw new Error(error);
  }
};