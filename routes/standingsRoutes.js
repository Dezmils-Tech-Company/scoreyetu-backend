// routes/standingsRoutes.js
const express = require("express");
const router = express.Router();
const standingsController = require("../controllers/standingsController");

router.get("/standings/:sport", standingsController.getStandings);

module.exports = router;
