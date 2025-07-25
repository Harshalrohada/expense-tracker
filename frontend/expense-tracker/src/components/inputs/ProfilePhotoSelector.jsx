import React, { useState } from 'react'
import {LuUser,LuUpload ,LuTrash} from "react-icons/lu";
import { useRef } from 'react';

const ProfilePhotoSelector = ({image,setImage}) => {
  const inputref=useRef(null);
  const[previUrl,setPreviewUrl]=useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the image state
      setImage(file);
      // Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  const onChooseFile = () => {
    inputref.current.click();
  };
    return (
      <div className="flex justify-center mb--6">
        <input
          type="file"
          accept="image/*"
          ref={inputref}
          onChange={handleImageChange}
          className="hidden"
        />

        {!image ? (
          <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
            <LuUser className="text-4xl text-primary" />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute bottom-1 right-1"
              onClick={onChooseFile}
            >
              <LuUpload />
            </button>
          </div>
        ) : (
          <div className="relative">
            <img
              src={previUrl}
              alt="profile photo"
              className="w-20 h-20 rounded-full"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute bottom-1 right-1"
              onClick={handleRemoveImage}
            >
              <LuTrash />
            </button>
          </div>
        )}
      </div>
    ); 
}

export default ProfilePhotoSelector