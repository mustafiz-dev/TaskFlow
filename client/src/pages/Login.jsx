
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { Eye, EyeOff } from "lucide-react";

import { auth } from "../firebase/firebase.config";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Login with Firebase
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User logged in successfully");

      // Redirect after login
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      // Friendly Firebase error messages
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many failed attempts. Please try again later."
          );
          break;

        default:
          setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setError("");

    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      // await signInWithPopup(auth, provider);
       await signInWithPopup(auth, provider);

// const firebaseUser = result.user;

// console.log("Google login successful");
// console.log("User:", firebaseUser);
// console.log("Name:", firebaseUser.displayName);
// console.log("Email:", firebaseUser.email);
// console.log("Photo URL:", firebaseUser.photoURL);
      

      console.log("Google login successful");

      navigate("/");

    } catch (error) {
      console.error("Google login error:", error);

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
            Welcome Back
          </h1>

          <p className="mt-2 text-base-content/70">
            Login to your TaskFlow account.
          </p>

        </div>

        {/* Login Card */}
        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-2">
                <span>{error}</span>
              </div>
            )}

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
                onChange={(e) => setEmail(e.target.value)}
              />

            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">

              <label className="fieldset-legend">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>

              </div>

            </fieldset>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleLogin}
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="divider">
              OR
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >

              {/* Google Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >

                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.23-2.23H12v4.22h5.23a4.47 4.47 0 0 1 1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.36z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.54 13.6a5.86 5.86 0 0 1 0-3.2V7.88H3.3a9.75 9.75 0 0 0 0 8.24l3.24 2.52z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52 0.04 0.04C7.31 8.09 9.46 6.37 12 6.37z"
                />

              </svg>

              Continue with Google

            </button>

            {/* Register Link */}
            <p className="text-center text-sm mt-4">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Login;
