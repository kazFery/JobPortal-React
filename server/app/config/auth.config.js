require("dotenv").config("../../.env");
module.exports = {
  secret: process.env.SECRETKEY,
};
