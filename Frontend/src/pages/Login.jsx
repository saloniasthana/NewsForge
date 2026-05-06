import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", formData);

      login(data.user, data.token);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;