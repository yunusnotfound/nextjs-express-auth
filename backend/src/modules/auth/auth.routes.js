const { Router } = require("express");
const authController = require("./auth.controller");
const validate = require("../../middleware/auth.middleware");
const { registerSchema, loginSchema, refreshSchema } = require("./auth.schema");

const router = Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/refresh", validate(refreshSchema), authController.refresh);

router.post("/logout", authController.logout);

module.exports = { authRouter: router };
