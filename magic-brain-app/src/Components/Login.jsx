import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser, loading, user, loginError, setLoginError } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoginError({})
  }, [setLoginError]);


  if (loading) {
    return (
      <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
    );
  }

  // If the user is already authenticated, redirect to the home page
//   if (user) {
//     navigate("/profile");
//   }

  // Handle form submission for user login
  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        if (result.user.uid){navigate("/profile")};
      })      

    e.target.reset();
  };

  return (
    <div>        
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
        
            <div className="bg-black text-white text-center py-4 px-6">
          {/* <!-- Card Header --> */}
          <h2 className="text-xl font-semibold">Login Form</h2>
        </div>
              <form onSubmit={handleLogIn}>
                <div className="form-control p-3">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control p-3">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"


                    name="password"
                    placeholder="Password"
                    className="input input-bordered"
                  />
                </div>
                <div className="bg-gray-100 p-4 text-center flex flex-col gap-2">
            {/* <!-- Card Footer --> */}
            <p className="text-customOrange font-bold text-xl">{loginError.message}</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-customBlue">
              Log In
            </button>
            <span>
              <Link className="underline" to="/register">
                Create account
              </Link>
            </span>
          </div>
              </form>
            </div>
          </div>
        
  );
};

export default Login;
