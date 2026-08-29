import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Register() {
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
                onChange={(e) => setName(e.target.value)}
              />
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            {/* Confirm Password */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </fieldset>

            {/* Create Account */}
            <button
              type="button"
              className="btn btn-primary w-full mt-4"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Google Sign In */}
            <button
              type="button"
              className="btn btn-outline w-full"
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