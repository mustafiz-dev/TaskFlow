
import { useState } from "react";
import { updateProfile } from "firebase/auth";

import { auth } from "../firebase/firebase.config";
import { useAuth } from "../context/useAuth";
import uploadImage from "../utils/uploadImage";

function ProfileForm({ user, refreshUser }) {
  const [name, setName] = useState(user.displayName || "");
  const [profileImage, setProfileImage] = useState(null);

  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      setProfileImage(null);
      return;
    }

    // Check image size
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      setProfileImage(null);
      return;
    }

    setError("");
    setMessage("");
    setProfileImage(file);
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Validate name
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    if (!auth.currentUser) {
      setError("You must be logged in.");
      return;
    }

    try {
      setUpdating(true);

      // Keep the existing photo if no new image is selected
      let photoURL = user.photoURL || "";

      // Upload new image to Cloudinary
      if (profileImage) {
        photoURL = await uploadImage(profileImage);
      }

      // Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
        photoURL: photoURL,
      });

      // Refresh AuthContext
      await refreshUser();

      // Clear selected image
      setProfileImage(null);

      // Show success message
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err.message || "Failed to update profile."
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Update Profile
          </h1>

          <p className="mt-2 text-base-content/70">
            Update your TaskFlow profile information.
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            {/* Success message */}
            {message && (
              <div className="alert alert-success mb-4">
                <span>{message}</span>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile}>

              {/* Name */}
              <fieldset className="fieldset">
                <label className="fieldset-legend">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setMessage("");
                  }}
                />
              </fieldset>

              {/* Profile Image */}
              <fieldset className="fieldset">
                <label className="fieldset-legend">
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />

                <p className="text-xs text-base-content/60">
                  JPG, PNG, WEBP — maximum 5MB
                </p>

                {profileImage && (
                  <p className="text-sm text-success mt-1">
                    Selected: {profileImage.name}
                  </p>
                )}
              </fieldset>

              {/* Email */}
              <fieldset className="fieldset">
                <label className="fieldset-legend">
                  Email
                </label>

                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={user.email || ""}
                  disabled
                />

                <p className="text-xs text-base-content/60 mt-1">
                  Email is managed by Firebase Authentication.
                </p>
              </fieldset>

              {/* Update Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-5"
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : "Update Profile"}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

function UpdateProfile() {
  const {
    user,
    loading,
    refreshUser,
  } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return null;
  }

  return (
    <ProfileForm
      key={user.uid}
      user={user}
      refreshUser={refreshUser}
    />
  );
}

export default UpdateProfile;
