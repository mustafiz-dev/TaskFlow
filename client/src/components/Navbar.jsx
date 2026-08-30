
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import logo3 from "../assets/logo3.png";
import { auth } from "../firebase/firebase.config";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Active link style
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "active font-semibold text-primary"
      : "";

  return (
    <div className="navbar bg-base-200 shadow-sm md:px-8">

      {/* LEFT SIDE */}
      <div className="navbar-start">

        {/* Mobile menu */}
        <div className="dropdown">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/tasks" className={navLinkClass}>
                Tasks
              </NavLink>
            </li>

            {/* Update Profile only when logged in */}
            {user && (
              <li>
                <NavLink
                  to="/update-profile"
                  className={navLinkClass}
                >
                  Update Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost text-2xl"
        >
          <img
            src={logo3}
            className="w-[40px]"
            alt="TaskFlow logo"
          />

          TaskFlow
        </Link>
      </div>

      {/* CENTER NAVIGATION */}
      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1">

          <li>
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              className={navLinkClass}
            >
              Services
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              className={navLinkClass}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks"
              className={navLinkClass}
            >
              Tasks
            </NavLink>
          </li>

          {/* Update Profile only when logged in */}
          {user && (
            <li>
              <NavLink
                to="/update-profile"
                className={navLinkClass}
              >
                Update Profile
              </NavLink>
            </li>
          )}

        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end">

        {!user ? (
          /* Logged out */
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `mr-4 ${
                  isActive
                    ? "text-primary font-semibold"
                    : ""
                }`
              }
            >
              Login
            </NavLink>

            <Link
              to="/register"
              className="btn btn-primary hidden md:flex"
            >
              Get TaskFlow for free
            </Link>
          </>
        ) : (
          /* Logged in */
          <div className="flex items-center gap-3">

            {/* Profile */}
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || user.email}
            >
              <Link to="/update-profile">
                <div className="avatar">

                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "Profile"}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-primary text-primary-content font-bold text-lg">
                        {(user.displayName ||
                          user.email ||
                          "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                  </div>
                </div>
              </Link>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="btn btn-primary"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Navbar;
