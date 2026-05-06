import { useEffect, useState } from "react";

import API from "../api/axios";

import StoryCard from "../components/StoryCard";

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data } = await API.get("/stories");

      setStories(data.stories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Top Hacker News Stories
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>

    </div>
  );
};

export default Home;