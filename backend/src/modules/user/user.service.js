const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./user.model");

const register = async (data) => {
  const existingUser = await userModel.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userModel.createUser({
    email: data.email,
    password: hashedPassword,
  });

  return user;
};

module.exports = { register };
