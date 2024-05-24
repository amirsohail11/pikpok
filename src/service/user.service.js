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

exports.userUpdate = async (req, Id) => {
  try {
    const id = Id || req._id;
    return await User.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        is_deleted: false
      },
      { $set: { ...req } },
      { new: true }
    ).lean();
  } catch (error) {
    throw new Error(error);
  }
};

exports.userFind = async (req) => {
  try {
    return await User.findOne(req);
  } catch (error) {
    throw new Error(error);
  }
};