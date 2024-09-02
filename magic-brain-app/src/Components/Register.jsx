import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {  
  const { createUser, user, loading, registrationError, setRegistrationError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   
  useEffect(() => {
    setRegistrationError({})
    console.log("bug")
  }, [setRegistrationError]);


  if (loading) {
    return (
      <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
    );
  }

  // // If the user is already authenticated, redirect to the home page
  // if (user) {
  //   navigate("/");
  // }

  const handleRegister = async (e) => {
    console.log("reg")
    e.preventDefault();      
    
    const user = await createUser(email, password, name);      
        if (user){navigate("/profile")};   
  };

  return (
    <div>
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
        <div className="bg-black text-white text-center py-4 px-6">
          {/* <!-- Card Header --> */}
          <h2 className="text-xl font-semibold">Registration Form</h2>
        </div>
        <form>
          <div className="form-control p-3">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              onChange={(e) => {setName(e.target.value)} }
            />
          </div>
          <div className="form-control p-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              onChange={(e) => {setEmail(e.target.value)} }
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
              onChange={(e) => {setPassword(e.target.value)} }
            />
          </div>
          <div className="bg-gray-100 p-4 text-center flex flex-col gap-2">
            {/* <!-- Card Footer --> */}
            <p className="text-customOrange font-bold text-xl">{registrationError.message}</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-customBlue" onClick={handleRegister}>
              Register
            </button>
            <span>
              <Link className="underline" to="/login">
                I have an account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
