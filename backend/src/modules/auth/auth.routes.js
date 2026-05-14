const { Router } = require("express");
const authController = require("./auth.controller");
const validate = require("../../middleware/auth.middleware");
const { registerSchema, loginSchema } = require("./auth.schema");

const router = Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

module.exports = { authRouter: router };
