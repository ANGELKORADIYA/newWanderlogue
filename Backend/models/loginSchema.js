const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  user: {required: true,type: String},
  email: {required: true,type: String},
  password: {required: true,type: String},
});
const loginModel = mongoose.model("login", loginSchema);

module.exports = { loginModel };
