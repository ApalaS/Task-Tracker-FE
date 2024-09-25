import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/FormStyles.css";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
  
    const handleSignIn = async (e) => {
      e.preventDefault();
      setErrorMessage("");
  
      // Validate input
      if (!validateEmail(email)) {
        setErrorMessage("Invalid email format");
        return;
      }
  
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long");
        return;
      }
  
      try {
        // Make the request to sign in
        const response = await axios.post("/api/signin", { email, password });
  
        // If successful, store the JWT token in HttpOnly cookie via server
        if (response.data.token) {
          // Set JWT Token using httpOnly cookie on the server
          Cookies.set("token", response.data.token, { secure: true, sameSite: "strict", expires: 7 });
  
          // Redirect user or show success message
          window.location.href = "/dashboard"; // Example redirect
        }
      } catch (error) {
        setErrorMessage("Invalid email or password");
      }
    };

  return (
    <div className="container">
        <h1>Sign In</h1>
      <div className="form-box">
        <form onSubmit={handleSignIn}>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Submit</button>
          <div className="form-footer">
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
        </form>
        <div className="toggle-theme">
          <button onClick={toggleTheme}>
            <div className="icon"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
