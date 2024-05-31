const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js");
const middleware = require("../middleware/index.js");

// Signup route
router.get("/auth/signup", middleware.ensureNotLoggedIn, authController.signupPage);

// Signup POST route
router.post("/auth/signup", middleware.ensureNotLoggedIn, authController.signup);

// Login route
router.get("/auth/login", middleware.ensureNotLoggedIn, authController.loginPage);

// Login POST route
router.post("/auth/login", middleware.ensureNotLoggedIn, authController.login);

// Logout route
router.get("/auth/logout", authController.logout);

module.exports = router;