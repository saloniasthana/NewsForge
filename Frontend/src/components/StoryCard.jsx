import { useContext, useState } from "react";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

const StoryCard = ({ story }) => {
  const { user } = useContext(AuthContext);

  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await API.post(`/stories/${story._id}/bookmark`);

      setBookmarked(!bookmarked);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <h2 className="text-2xl font-semibold mb-4">
        {story.title}
      </h2>

      <div className="space-y-2 text-gray-700">

        <p>
          🔥 Points: <span className="font-semibold">{story.points}</span>
        </p>

        <p>
          👤 Author: <span className="font-semibold">{story.author}</span>
        </p>

        <p>
          ⏰ {story.postedAt}
        </p>

      </div>

      <div className="flex gap-4 mt-5">

        <a
          href={story.url}
          target="_blank"
          rel="noreferrer"
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Read Story
        </a>

        <button
          onClick={handleBookmark}
          className={`px-5 py-2 rounded-lg text-white transition ${
            bookmarked
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>

      </div>

    </div>
  );
};

export default StoryCard;