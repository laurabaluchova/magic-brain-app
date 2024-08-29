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
          <NavLink
              className={({ isActive }) => {
                const baseClasses = "px-4 py-2 rounded transition-colors duration-300";
                const activeClasses = "bg-black text-white";
                const defaultClasses = "bg-transparent text-black";
                const hoverClasses = "hover:text-white hover:bg-black"; 
                const focusClasses = "focus:outline-none focus:bg-black focus:text-white"; // Remove default focus outline
            
                return isActive
                  ? `${baseClasses} ${activeClasses}`
                  : `${baseClasses} ${defaultClasses} ${hoverClasses} ${focusClasses}`;
              }}
              to="/login"
            >
              Log In
            </NavLink>
          </li>
          <li>
          <NavLink
              className={({ isActive }) => {
                const baseClasses = "px-4 py-2 rounded transition-colors duration-300";
                const activeClasses = "bg-black text-white";
                const defaultClasses = "bg-transparent text-black";
                const hoverClasses = "hover:text-white hover:bg-black"; 
                const focusClasses = "focus:outline-none focus:bg-black focus:text-white"; // Remove default focus outline
            
                return isActive
                  ? `${baseClasses} ${activeClasses}`
                  : `${baseClasses} ${defaultClasses} ${hoverClasses} ${focusClasses}`;
              }}
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <>
          <li>
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
                const baseClasses =
                  "px-4 py-2 rounded transition-colors duration-300";
                const activeClasses = "bg-customOrange text-white";
                const defaultClasses = "bg-transparent text-black";
                const hoverClasses = "hover:text-white hover:bg-customOrange";
                const focusClasses =
                  "focus:outline-none focus:bg-customOrange focus:text-white";

                return isActive
                  ? `${baseClasses} ${activeClasses}`
                  : `${baseClasses} ${defaultClasses} ${hoverClasses} ${focusClasses}`;
              }}
              to="/faces"
            >
              Face Recognition
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                const baseClasses =
                  "px-4 py-2 rounded transition-colors duration-300";
                const activeClasses = "bg-customBlue text-white";
                const defaultClasses = "bg-transparent text-black";
                const hoverClasses = "hover:text-white hover:bg-customBlue";
                const focusClasses =
                  "focus:outline-none focus:bg-customBlue focus:text-white";

                return isActive
                  ? `${baseClasses} ${activeClasses}`
                  : `${baseClasses} ${defaultClasses} ${hoverClasses} ${focusClasses}`;
              }}
              to="/colors"
            >
              Color Detection
            </NavLink>
          </li>

          <li>
          <NavLink
              className={({ isActive }) => {
                const baseClasses = "px-4 py-2 rounded transition-colors duration-300";
                const activeClasses = "bg-black text-white";
                const defaultClasses = "bg-transparent text-black";
                const hoverClasses = "hover:text-white hover:bg-black"; 
                const focusClasses = "focus:outline-none focus:bg-black focus:text-white"; // Remove default focus outline
            
                return isActive
                  ? `${baseClasses} ${activeClasses}`
                  : `${baseClasses} ${defaultClasses} ${hoverClasses} ${focusClasses}`;
              }}
              to="/"
            >
              Settings
            </NavLink>
          </li>
          <li>
          <a
              className="px-4 py-2 rounded bg-transparent text-black hover:bg-black hover:text-white hover:cursor-pointer"
              onClick={handleSingOut}
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
    <div className="navbar flex justify-between items-center bg-base-100 m-3 mb-6  border-b border-b-2">
      <div className="flex">
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
      <div>
        <ul className="px-1 flex gap-4 ml-auto">{navLinks}</ul>
      </div>
    </div>
  );
};

export default Header;
