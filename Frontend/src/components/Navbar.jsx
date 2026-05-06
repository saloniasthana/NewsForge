import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold">
        NewsForge
      </h1>

      <div className="flex gap-6 text-lg items-center">

        <Link to="/" className="hover:text-yellow-400 transition">
          Home
        </Link>

        <Link to="/bookmarks" className="hover:text-yellow-400 transition">
          Bookmarks
        </Link>

        {user ? (
          <>
            <span>
              Hello, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>

            <Link to="/register" className="hover:text-yellow-400 transition">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;