import { useEffect, useState } from "react";

import API from "../api/axios";

import StoryCard from "../components/StoryCard";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const { data } = await API.get("/stories/bookmarks/all");

      setBookmarks(data.bookmarks);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Your Bookmarks
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        {bookmarks.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}

      </div>

    </div>
  );
};

export default Bookmarks;