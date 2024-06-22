import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const profilePicture = async (profilePictureUrl) => {
    setLoading(true);
    try {
      const res = await axios.put("/api/user/profile", {
        profilePicture: profilePictureUrl,
      });
      toast.success("Picture added successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, profilePicture };
};

export default useProfilePicture;
