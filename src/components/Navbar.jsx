import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-lg border-b border-gray-200 rounded-b-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-purple-600 drop-shadow-md">
          JobFinder
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-transform duration-300 ease-in-out hover:scale-105 ${
                isActive ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-transform duration-300 ease-in-out hover:scale-105 ${
                isActive ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `transition-transform duration-300 ease-in-out hover:scale-105 ${
                isActive ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"
              }`
            }
          >
            Jobs
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/auth"
            className="px-4 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition duration-300 hover:scale-105"
          >
            Sign In
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg shadow hover:scale-105 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-white/90 backdrop-blur-md shadow-lg rounded-b-xl transition-all duration-300">
          <NavLink to="/" className="hover:text-purple-600" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/dashboard" className="hover:text-purple-600" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/jobs" className="hover:text-purple-600" onClick={() => setMenuOpen(false)}>Jobs</NavLink>
          <Link to="/auth" className="border px-4 py-2 rounded-lg text-purple-600 hover:bg-purple-50" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;