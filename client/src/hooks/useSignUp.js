import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signup = async ({ fullName, username, password }) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", {
        fullName,
        username,
        password,
      });
      toast.success("Signup successful!");
      navigate("/profile-image");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignUp;
