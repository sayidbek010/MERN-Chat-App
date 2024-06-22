import React from "react";
import { useLogoutMutation } from "../slices/authApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div>
      <h1>Logout From {userInfo.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
