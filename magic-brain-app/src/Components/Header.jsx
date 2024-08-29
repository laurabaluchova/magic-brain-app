import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Header = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSingOut = () => {
    logOut()
      .then(() => {
        console.log("user logged out successfully");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      {!user && (
        <>
          <li>
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </a>
          </li>
        </>
      )}
      {user && (
        <>
          <li className="hover:bg-customOrange rounded-md">
            {/* <a
              className="hover:text-white"
              onClick={() => {
                navigate("/faces");
              }}
            >
              Face Recognition
            </a> */}
            <NavLink
              className={({ isActive }) => {
                const baseClasses = "px-4 py-2 rounded transition-colors duration-300";
                const activeClasses = "bg-customOrange text-white";
                const defaultClasses = "bg-transparent text-gray-500";
                const hoverClasses = "hover:text-white hover:bg-customOrange"; // Hover effect
                const focusClasses = "focus:outline-none"; // Remove default focus outline
            
                return isActive
                  ? `${baseClasses} ${activeClasses}`
                  : `${baseClasses} ${defaultClasses} ${hoverClasses} ${focusClasses}`;
              }}
              to="/faces"
            >
              Face Recognition
            </NavLink>
          </li>
          <li className="hover:bg-customBlue rounded-md ">
            <a
              className="hover:text-white"
              onClick={() => {
                navigate("/colors");
              }}
            >
              Color Detection
            </a>
          </li>
          <li>
            <details>
              <summary>Profile</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleSingOut}>Sign Out</a>
                </li>
              </ul>
            </details>
          </li>
        </>
      )}
    </>
  );
  return loading ? (
    <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
  ) : (
    <div className="navbar bg-base-100 m-3">
      <div className="flex-1">
        <a
          className="btn bg-white hover:bg-white border-0 text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="h-6" src="/brain.png" />
          Magic Brain App
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
    </div>
  );
};

export default Header;
