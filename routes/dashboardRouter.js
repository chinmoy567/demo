// routes/dashboardRouter.js
const express = require("express");
const router = express.Router();
const { getDashboardPage } = require("../controllers/dashboardController");

// Main dashboard route
router.get("/", getDashboardPage);

module.exports = router;
