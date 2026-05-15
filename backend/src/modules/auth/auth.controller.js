const authService = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const result = await authService.refresh(refreshToken);

  res.status(200).json(result);
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  await authService.logout(refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out" });
});

module.exports = { register, login, refresh, logout };
