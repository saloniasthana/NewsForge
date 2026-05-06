const axios = require("axios");
const cheerio = require("cheerio");

const Story = require("../models/Story");

const scrapeHackerNews = async () => {
  try {
    const url = "https://news.ycombinator.com";

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const stories = [];

    $(".athing").each((index, element) => {
      if (index < 10) {
        const title = $(element).find(".titleline a").text();

        const url = $(element).find(".titleline a").attr("href");

        const subtext = $(element).next();

        const pointsText = subtext.find(".score").text();

        const points = parseInt(pointsText) || 0;

        const author = subtext.find(".hnuser").text();

        const postedAt = subtext.find(".age").text();

        stories.push({
          title,
          url,
          points,
          author,
          postedAt,
        });
      }
    });

    await Story.deleteMany();

    await Story.insertMany(stories);

    console.log("Stories scraped successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = scrapeHackerNews;