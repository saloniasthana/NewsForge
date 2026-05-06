const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");
const scrapeHackerNews = require("./scraper/scraper");

const app = express();

//Middleware
// app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//Routes
app.use("/api/scrape", require("./routes/scrapeRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/stories", require("./routes/storyRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Start server properly
const startServer = async () => {
  try {
    // Wait for MongoDB connection
    await connectDB();

    // Wait for scraper
    await scrapeHackerNews();

    // Start Express server
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log(error.message);
  }
};

startServer();