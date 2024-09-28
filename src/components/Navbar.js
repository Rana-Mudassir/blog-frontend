import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get the auth state

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to the home page after logout
  };

  const LinkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <>
      <nav className="bg-indigo-700 border-b border-indigo-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img className="h-10 w-auto" src={logo} alt="blogs-manger" />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Blog Manager
                </span>
              </NavLink>

              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink to="/" className={LinkClass}>
                    Home
                  </NavLink>
                  {isAuthenticated && (
                    <NavLink to="/create" className={LinkClass}>
                      Create Post
                    </NavLink>
                  )}
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink to="/login" className={LinkClass}>
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
