import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData);
  };

  return (
    <div className="h-screen bg-blue-500 flex flex-col items-center justify-center">
      <h2 className="mb-4 text-center text-3xl font-extrabold text-white">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-[320px]">
        <div>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="appearance-none mb-3 rounded-xl block w-full px-4 py-3 focus:outline-none"
            placeholder="Username"
            onChange={handleChange}
            value={userData.username}
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none mb-3 rounded-xl block w-full px-4 py-3 focus:outline-none"
            placeholder="Password"
            onChange={handleChange}
            value={userData.password}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mb-3 rounded-xl px-4 py-3 border border-transparent font-medium text-white bg-blue-900 hover:bg-blue-800"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-white">
        Don't have an account?{" "}
        <Link to="/signup" className="underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
