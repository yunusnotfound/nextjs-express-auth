const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const register = async ({ email, password }) => {
  // check if user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }
  // check if hashed password matches the password
  const isMatch = await bcrypt.compare(password, user.password);
  // if dont throw error
  if (!isMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  // update the user with refreshToken
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken,
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError(401, "No refresh token");
  }

  // verify refresh token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  // if user refresh token doenst match with refreshToken throw error
  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError(403, "Invalid refresh token");
  }

  // create new access token for user
  const newAccessToken = generateAccessToken(user);

  return { accessToken: newAccessToken };
};

const logout = async (refreshToken) => {
  // if refreshToken null directly return
  if (!refreshToken) return;

  // verify token first
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  // update user refreshToken to null and return
  await prisma.user.update({
    where: { id: decoded.id },
    data: { refreshToken: null },
  });

  return true;
};

module.exports = { register, login, refresh, logout };
