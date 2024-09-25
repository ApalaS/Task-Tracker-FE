import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import "../../styles/FormStyles.css";

const SignUp = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      const theme = JSON.parse(localStorage.getItem("isDarkMode"));
      if (theme) {
        document.body.classList.add("dark-mode");
        setIsDarkMode(true);
      }
    }, []);
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
      document.body.classList.toggle("dark-mode");
    };

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      setErrorMessage("");
  
      // Validate input
      if (username.trim() === "") {
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
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
  
      try {
        // Make the request to sign up
        const response = await axios.post("/api/signup", { username, email, password });

        if (response.data.token) {

          setToken(response.data.token);
          navigate('/home', {replace: true})
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
            <Link to="/signin">Already have an account? Sign In</Link>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="toggle-theme">
          <button className="toggle-theme-button" onClick={toggleTheme}>
            <div className="icon"></div>
          </button>
        </div>
    </div>
  );
};

export default SignUp;
