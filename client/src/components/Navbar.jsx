
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import logo3 from "../assets/logo3.png";
import { auth } from "../firebase/firebase.config";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Active link styling
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "active font-semibold"
      : "";

  return (
    <div className="navbar bg-base-200 shadow-sm md:px-8">

      {/* LEFT SIDE */}
      <div className="navbar-start">

        {/* Mobile Menu */}
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
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

            {/* Update Profile - Logged in users only */}
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

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1">

          <li>
            <NavLink
              to="/"
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

          {/* Update Profile */}
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

        {!loading && !user && (
          <>
            {/* Login */}
            <NavLink
              to="/login"
              className="mr-4"
            >
              Login
            </NavLink>

            {/* Register */}
            <Link
              to="/register"
              className="btn btn-primary hidden md:flex"
            >
              Get TaskFlow for free
            </Link>
          </>
        )}

        {!loading && user && (
          <div className="flex items-center gap-3">

            {/* Profile */}
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >

              <Link to="/update-profile">

                <div className="avatar">

                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={
                          user.displayName ||
                          "Profile"
                        }
                      />
                    ) : (
                      <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center text-lg font-semibold">
                        {user.displayName
                          ? user.displayName
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
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
