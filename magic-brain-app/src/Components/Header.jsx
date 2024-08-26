import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
                navigate("/");
              }}
            >
              Log In
            </a>
          </li>
          <li>
            <a onClick={() => {
                navigate("/");
              }}>Register</a>
          </li>
        </>
      )}
      {user && (
        <>
          <li>
            <a
              onClick={() => {
                navigate("/profile");
              }}
            >
              Face Recignition
            </a>
          </li>
          <li>
            <a>Color Recignition</a>
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
        <ul className="menu menu-horizontal px-1">
          {/* <li><a onClick={() => {navigate("/profile")}}>Face Recignition</a></li>
      <li><a>Color Recignition</a></li>
      <li>
        <details>
          <summary>Profile</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a>Settings</a></li>
            <li><a onClick={handleSingOut}>Sign Out</a></li>
          </ul>
        </details>
      </li> */}
          {navLinks}
        </ul>
      </div>
    </div>
  );
  //   ) : (
  //     <div>
  //       <div className="navbar bg-base-100">
  //         <div className="navbar-start">
  //           <div className="dropdown">
  //             <label tabIndex={0} className="btn btn-ghost lg:hidden">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className="h-5 w-5"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 stroke="currentColor"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M4 6h16M4 12h8m-8 6h16"
  //                 />
  //               </svg>
  //             </label>
  //             <ul
  //               tabIndex={0}
  //               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
  //             >
  //               {navLinks}
  //             </ul>
  //           </div>
  //           <a className="btn btn-ghost normal-case text-xl">Firebase Auth</a>
  //         </div>
  //         <div className="navbar-center hidden lg:flex">
  //           <ul className="menu menu-horizontal px-1">{navLinks}</ul>
  //         </div>
  //         <div className="navbar-end">
  //           {user && <a className="btn">{user.displayName}</a>}
  //           {user && (
  //             <div className="dropdown dropdown-end">
  //               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
  //                 <div className="w-10 rounded-full">
  //                   <img src="https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
  //                 </div>
  //               </label>
  //               <ul
  //                 tabIndex={0}
  //                 className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
  //               >
  //                 <li>
  //                   <Link to="/profile">
  //                     <span className="justify-between">Profile</span>
  //                   </Link>
  //                 </li>
  //                 <li>
  //                   <a onClick={handleSingOut}>Logout</a>
  //                 </li>
  //               </ul>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Header;
