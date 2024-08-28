// import { useState } from "react";
// import "../forms.css";
// import { auth } from "../App";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { useNavigate, Link } from 'react-router-dom';

// // import {useAuthValue} from './AuthContext'

// function Register() {
//   const [displayName, setDisplayName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   // const {setTimeActive} = useAuthValue()

//   const validatePassword = () => {
//     let isValid = true;
//     if (password !== "" && confirmPassword !== "") {
//       if (password !== confirmPassword) {
//         isValid = false;
//         setError("Passwords does not match");
//       }
//     }
//     return isValid;
//   };

//   const register = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (validatePassword) {
//       try {
//         // Create a new user with email and password
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         // Get the user from the userCredential object
//         const user = userCredential.user;

//         // Update the user's profile with the display name
//         await updateProfile(user, { displayName: displayName });

//         // If the above operations are successful, clear the form fields
//         setDisplayName("");
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");

//         navigate('/profile');

//         // Log the current user to the console to verify the update
//         console.log(auth.currentUser);
//       } catch (err) {
//         // Log any errors that occur during user creation or profile update
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div className="center">
//       <div className="auth">
//         <h1>Register</h1>
//         {error && <div className="auth__error">{error}</div>}
//         <form name="registration_form">
//           <input
//             type="name"
//             value={displayName}
//             placeholder="Enter your name"
//             required
//             onChange={(e) => setDisplayName(e.target.value)}
//           />

//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             value={password}
//             required
//             placeholder="Enter your password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <input
//             type="password"
//             value={confirmPassword}
//             required
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <button onClick={register} type="submit">
//             Register
//           </button>
//         </form>
//         <span>

//           <Link to='/'>Already have an account?</Link>
//         </span>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../App";

const Register = () => {
  const { createUser, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
    );
  }

  // // If the user is already authenticated, redirect to the home page
  // if (user) {
  //   navigate("/");
  // }

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name.value;
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   createUser(email, password)
  //     .then((result) => {
  //       updateProfile(result.user, {
  //         displayName: name,
  //       });
  //       navigate("/profile");
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   e.target.reset();
  // };

  const register = async (e) => {
    e.preventDefault();
    // setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user from the userCredential object
      const user = userCredential.user;

      // Update the user's profile with the display name
      await updateProfile(user, { displayName: name });

      // If the above operations are successful, clear the form fields
      // setDisplayName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");

      navigate("/profile");

      // Log the current user to the console to verify the update
      console.log(auth.currentUser);
    } catch (err) {
      // Log any errors that occur during user creation or profile update
      console.log(err);
    }
  };

  return (
    <div>
      {/* <div className="min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="text-xl font-bold">Register</div> */}
              <body className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Register</h2>
              <form onSubmit={register}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
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
                <div className="form-control mt-6">
                  <button className="btn btn-primary mb-2">Sign Up</button>
                </div>
                <span>          
          <Link className="underline" to='/login'>I have an account</Link>
        </span>
              </form>
            </div>
            </body>
            </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Register;
