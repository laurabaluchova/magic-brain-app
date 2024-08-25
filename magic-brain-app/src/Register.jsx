import { useState } from "react";
import "./forms.css";
import { auth } from "./App";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
// import {useAuthValue} from './AuthContext'

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const {setTimeActive} = useAuthValue()

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const register = async (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword) {
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
        await updateProfile(user, { displayName: displayName });

        // If the above operations are successful, clear the form fields
        setDisplayName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate('/profile');

        // Log the current user to the console to verify the update
        console.log(auth.currentUser);
      } catch (err) {
        // Log any errors that occur during user creation or profile update
        console.log(err);
      }
    }
  };

  return (
    <div className="center">
      <div className="auth">
        <h1>Register</h1>
        {error && <div className="auth__error">{error}</div>}
        <form name="registration_form">
          <input
            type="name"
            value={displayName}
            placeholder="Enter your name"
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={register} type="submit">
            Register
          </button>
        </form>
        <span>
          Already have an account?
          {/* <Link to='/login'>login</Link> */}
        </span>
      </div>
    </div>
  );
}

export default Register;
