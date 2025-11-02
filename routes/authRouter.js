// routes/authRouter.js
const express = require("express");
const router = express.Router();
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logoutUser,
} = require("../controllers/authController");

// Middleware to parse form data
router.use(express.urlencoded({ extended: true }));

// Routes
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/logout", logoutUser);

module.exports = router;
