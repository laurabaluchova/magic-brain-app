import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Header = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      {!user && (
        <>          
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded transition-colors duration-300 bg-black text-white"
                  : "px-4 py-2 rounded transition-colors duration-300 bg-transparent text-black hover:text-white hover:bg-black focus:outline-none focus:bg-black focus:text-white"
              }
              to="/register"
            >
              Create Account
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded transition-colors duration-300 bg-black text-white"
                  : "px-4 py-2 rounded transition-colors duration-300 bg-transparent text-black hover:text-white hover:bg-black focus:outline-none focus:bg-black focus:text-white"
              }
              to="/login"
            >
              Log In
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded transition-colors duration-300 bg-customOrange text-white"
                  : "px-4 py-2 rounded transition-colors duration-300 bg-transparent text-black hover:text-white hover:bg-customOrange focus:outline-none focus:bg-customOrange focus:text-white"
              }
              to="/faces"
            >
              Face Recognition
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded transition-colors duration-300 bg-customBlue text-white"
                  : "px-4 py-2 rounded transition-colors duration-300 bg-transparent text-black hover:text-white hover:bg-customBlue focus:outline-none focus:bg-customBlue focus:text-white"
              }
              to="/colors"
            >
              Color Detection
            </NavLink>
          </li>

          <li>
            <a
              className="px-4 py-2 rounded bg-transparent text-black hover:bg-black hover:text-white hover:cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </a>
          </li>
        </>
      )}
    </>
  );

  return loading ? (
    <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
  ) : (
    <div className="navbar flex flex-col lg:flex-row justify-between items-center bg-base-100 m-3 mb-6 border-b border-b-2">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <a
          className="btn bg-white hover:bg-white border-0 text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="h-6" src="/brain.png" alt="Magic Brain Logo" />
          Magic Brain App
        </a>
        {/* Toggle button for mobile menu */}
        <button
          className="lg:hidden block text-black hover:text-white hover:bg-black p-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Hamburger icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {/* Menu for larger screens and conditionally shown menu for smaller screens */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full lg:flex lg:items-center lg:space-x-4 lg:w-auto transition-all duration-300`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Header;
