import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/FormStyles.css";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      setErrorMessage("");
  
      // Validate input
      if (name.trim() === "") {
        setErrorMessage("Name is required");
        return;
      }
  
      if (!validateEmail(email)) {
        setErrorMessage("Invalid email format");
        return;
      }
  
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long");
        return;
      }
  
      try {
        // Make the request to sign up
        const response = await axios.post("/api/signup", { name, email, password });
  
        // If successful, store the JWT token in HttpOnly cookie via server
        if (response.data.token) {
          // Set JWT Token using httpOnly cookie on the server
          Cookies.set("token", response.data.token, { secure: true, sameSite: "strict", expires: 7 });
  
          // Redirect user or show success message
          window.location.href = "/dashboard"; // Example redirect
        }
      } catch (error) {
        setErrorMessage("Error signing up, please try again");
      }
    };

  return (
    <div className="container">
        <h1>Sign Up</h1>
      <div className="form-box">
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-footer">
            <a href="/signin">Already have an account? Sign In</a>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Submit</button>
        </form>
        <div className="toggle-theme">
          <button className="toggle-theme-button" onClick={toggleTheme}>
            <div className="icon"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
