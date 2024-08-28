import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
          <li>
            <a
              onClick={() => {
                navigate("/faces");
              }}
            >
              Face Recognition
            </a>
          </li>
          <li>
            <a
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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
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
