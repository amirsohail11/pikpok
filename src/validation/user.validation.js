const joi = require("joi");

exports.createUser = joi.object({
  userId: joi.string(),
  first_name: joi
  .string()
  .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
  .required(),
  last_name: joi
  .string()
  .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
  .optional(),
  full_name: joi
  .string()
  .regex(/^[a-zA-Z\s]+$/)
  .required(),
  email: joi
  .string()
  .email()
  .required(),
  password: joi
  .string()
  .required(),
  user_type: joi
    .string()
    .valid("superadmin", "admin", "user")
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required(),
  mobile_number: joi
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .min(10)
    .required(),
  avatar: joi.string().optional(),
  dob: joi.date().optional(),
  status: joi.boolean().required(),
  device_type: joi
    .string()
    .valid("ios", "android", "web")
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required(),
  device_id: joi.string().optional(),
});

exports.loginUser = joi.object({
  email: joi
  .string()
  .email()
  .required(),
  password: joi
  .string()
  .required(),
})

exports.updateUser = joi.object({
  _id: joi.string().hex().length(24).required(),
  userId: joi.string().optional(),
  first_name: joi
    .string()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .optional(),
  last_name: joi
    .string()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .optional(),
  full_name: joi
    .string()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required(),
  email: joi
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .email()
    .optional(),
  mobile_number: joi
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .min(10)
    .optional(),
  avatar: joi.string().optional(),
  dob: joi.date().optional(),
  status: joi.string().optional(),
  device_type: joi
    .string()
    .valid("ios", "android", "web")
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .optional(),
  device_id: joi.string().optional(),
});

exports.deleteUser = joi.object({
  _id: joi.string().hex().length(24).required(),
})