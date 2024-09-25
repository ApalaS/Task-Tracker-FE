import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import "../../styles/FormStyles.css";

const SignIn = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
  
        if (response.data.token) {
          setToken( response.data.token);
          navigate('/',{replace: true});
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
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
      <div className="toggle-theme">
          <button onClick={toggleTheme}>
            <div className="icon"></div>
          </button>
        </div>
    </div>
  );
};

export default SignIn;
