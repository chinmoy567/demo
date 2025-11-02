// routes/storeRouter.js
const express = require("express");
const router = express.Router();
const { getHomePage } = require("../controllers/storeController");



// Home route
router.get("/", getHomePage);

module.exports = router;
