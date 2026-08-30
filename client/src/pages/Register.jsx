
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { Eye, EyeOff, Check, X } from "lucide-react";

import { auth } from "../firebase/firebase.config";
import { useAuth } from "../context/useAuth";
import uploadImage from "../utils/uploadImage";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth context
  const { refreshUser } = useAuth();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState(
    location.state?.email || ""
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  // Profile image
  const [profileImage, setProfileImage] =
    useState(null);

  // Password visibility
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password validation
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const passwordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number;

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

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
    setProfileImage(file);
  };

  // Save user information to MongoDB
  const saveUserToDatabase = async ({
    firebaseUid,
    name,
    email,
    photoURL,
  }) => {
    const response = await fetch(
      "http://localhost:5000/api/users",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firebaseUid,
          name,
          email,
          photoURL,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to save user"
      );
    }

    return data;
  };

  // Email / Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    // Check required fields
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check password requirements
    if (!passwordValid) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Firebase account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const firebaseUser = userCredential.user;

      // 2. Upload profile image to Cloudinary
      let photoURL = "";

      if (profileImage) {
        photoURL = await uploadImage(profileImage);
      }

      // 3. Update Firebase profile
      await updateProfile(firebaseUser, {
        displayName: name.trim(),
        photoURL: photoURL,
      });

      // 4. Save user to MongoDB
      await saveUserToDatabase({
        firebaseUid: firebaseUser.uid,
        name: name.trim(),
        email: firebaseUser.email,
        photoURL,
      });

      // 5. Refresh AuthContext
      await refreshUser();

      console.log("User registered successfully");

      // 6. Go to home page
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Registration
  const handleGoogleRegister = async () => {
    setError("");

    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      // Sign in with Google
      const result = await signInWithPopup(
        auth,
        provider
      );

      const firebaseUser = result.user;

      // Google provides its own photoURL
      await saveUserToDatabase({
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName || "",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "",
      });

      // Refresh AuthContext
      await refreshUser();

      console.log(
        "Google user registered successfully"
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Google registration error:",
        error
      );

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-4">

      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-base-content/70">
            Join TaskFlow and start managing your tasks.
          </p>

        </div>

        {/* Registration Card */}
        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            {/* Error */}
            {error && (
              <div className="alert alert-error mb-2">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister}>

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
                  onChange={(e) =>
                    setName(e.target.value)
                  }
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
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </fieldset>

              {/* Password */}
              <fieldset className="fieldset">

                <label className="fieldset-legend">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    className="input input-bordered w-full pr-12"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>

                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="mt-3 space-y-1 text-sm">

                    {/* 8 characters */}
                    <p
                      className={
                        passwordRules.length
                          ? "text-success flex items-center gap-2"
                          : "text-error flex items-center gap-2"
                      }
                    >
                      {passwordRules.length ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}

                      At least 8 characters
                    </p>

                    {/* Uppercase */}
                    <p
                      className={
                        passwordRules.uppercase
                          ? "text-success flex items-center gap-2"
                          : "text-error flex items-center gap-2"
                      }
                    >
                      {passwordRules.uppercase ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}

                      One uppercase letter
                    </p>

                    {/* Lowercase */}
                    <p
                      className={
                        passwordRules.lowercase
                          ? "text-success flex items-center gap-2"
                          : "text-error flex items-center gap-2"
                      }
                    >
                      {passwordRules.lowercase ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}

                      One lowercase letter
                    </p>

                    {/* Number */}
                    <p
                      className={
                        passwordRules.number
                          ? "text-success flex items-center gap-2"
                          : "text-error flex items-center gap-2"
                      }
                    >
                      {passwordRules.number ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}

                      One number
                    </p>

                  </div>
                )}

              </fieldset>

              {/* Confirm Password */}
              <fieldset className="fieldset">

                <label className="fieldset-legend">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    className="input input-bordered w-full pr-12"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>

                </div>

                {/* Password Match */}
                {confirmPassword && (
                  <p
                    className={
                      password === confirmPassword
                        ? "text-success text-sm mt-1 flex items-center gap-2"
                        : "text-error text-sm mt-1 flex items-center gap-2"
                    }
                  >
                    {password === confirmPassword ? (
                      <>
                        <Check className="w-4 h-4" />
                        Passwords match
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        Passwords do not match
                      </>
                    )}
                  </p>
                )}

              </fieldset>

              {/* Create Account */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            {/* Divider */}
            <div className="divider">
              OR
            </div>

            {/* Google Registration */}
            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={handleGoogleRegister}
              disabled={loading}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >

                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.23-2.23H12v4.22h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.36z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.54 13.6a5.86 5.86 0 0 1 0-3.2V7.88H3.3a9.75 9.75 0 0 0 0 8.24l3.24-2.52z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52C7.31 8.09 9.46 6.37 12 6.37z"
                />

              </svg>

              Continue with Google

            </button>

            {/* Login Link */}
            <p className="text-center text-sm mt-4">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Register;
