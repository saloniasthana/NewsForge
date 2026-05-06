const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

const {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarkedStories,
} = require("../controllers/storyController");

// const protect = require("../middleware/authMiddleware");

router.get("/", getStories);

router.get("/bookmarks/all", protect, getBookmarkedStories);

router.get("/:id", getSingleStory);

router.post("/:id/bookmark", protect, toggleBookmark);

module.exports = router;