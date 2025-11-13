import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '../Firebase/firebase.init';
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const auth = getAuth(app);

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleUpdate = (e) => {
    e.preventDefault();

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setMessage("Profile updated successfully.");
        setUser({
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
        });
        navigate("/")
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to update profile.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-200">
      <div className="card bg-base-100 shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-3">
          <div>
            <label className="block font-medium mb-1">Display Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Photo URL:</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Update Profile
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}

        <div className="mt-5 text-center">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
          )}
          <p className="font-semibold">{user?.displayName}</p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;