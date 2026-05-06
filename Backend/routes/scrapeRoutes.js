const express = require("express");

const router = express.Router();

const { scrapeStories } = require("../controllers/scrapeController");

router.post("/", scrapeStories);

module.exports = router;