import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../slices/authApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const SignUp = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(userData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="h-screen bg-blue-500 flex flex-col items-center justify-center">
      <h2 className="mb-4 text-center text-3xl font-extrabold text-white">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-[320px]">
        <div>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="appearance-none mb-3 rounded-xl block w-full px-4 py-3 focus:outline-none"
            placeholder="Full Name"
            onChange={handleChange}
            value={userData.fullName}
          />
        </div>
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
            disabled={isLoading}
            className="w-full mb-3 rounded-xl px-4 py-3 border border-transparent font-medium text-white bg-blue-900 hover:bg-blue-800"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-white">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
