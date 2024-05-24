const dotenv = require("dotenv");
dotenv.config();
const config = {
  /*
  |--------------------------------------------------------------------------
  | GENERAL: PORT
  |--------------------------------------------------------------------------
  */
  port: process.env.PORT,
  /*
  |--------------------------------------------------------------------------
  | DATABASE
  |--------------------------------------------------------------------------
  */
  databaseURL: process.env.DEVELOPMENT_URI,
  secret: process.env.JWT_SECRET,
};

module.exports = config;
