import React, { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import uploadFile from "../helpers/uploadFile";
import { Link } from "react-router-dom";
import useProfilePicture from "../hooks/useProfilePicture";

const ProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const fileInputRef = useRef(null);

  const { profilePicture } = useProfilePicture();

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const uploadPhoto = await uploadFile(file);
        setSelectedPicture(file);
        await profilePicture(uploadPhoto.url);
      } catch (error) {
        console.error("Error uploading picture:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="h-screen bg-blue-500 flex flex-col items-center justify-center">
      <h2 className="mb-4 text-center text-3xl font-extrabold text-white">
        Profile Image
      </h2>
      <div
        className="relative cursor-pointer rounded-full bg-white flex items-center justify-center overflow-hidden w-32 h-32 mb-4"
        onClick={handleChooseImage}
      >
        {loading ? (
          <p className="text-gray-400 text-lg">Uploading...</p>
        ) : selectedPicture ? (
          <img
            src={URL.createObjectURL(selectedPicture)}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        ) : (
          <AiOutlinePlus className="text-gray-400 text-4xl" />
        )}
        <input
          id="profilePicture"
          name="profilePicture"
          type="file"
          required
          ref={fileInputRef}
          onChange={handlePictureChange}
          className="hidden"
        />
      </div>
      <Link
        to="/"
        className="rounded-xl px-6 py-3 font-medium text-white bg-blue-900 hover:bg-blue-800"
      >
        Next
      </Link>
    </div>
  );
};

export default ProfilePicture;
