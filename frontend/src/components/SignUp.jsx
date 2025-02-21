import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username , setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/signUp", { 
        email, 
        username, 
        password 
      });
  
      if (response.status === 201) {
        alert("Account created successfully!");
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error creating account");
      console.error("Signup Error:", err);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form  className="p-4 border rounded">
        <h2>Sign Up</h2>
        {error && <p className="text-danger">{error}</p>}
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required className="form-control mb-2" />
        <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required className="form-control mb-2" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className="form-control mb-2" />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required className="form-control mb-2" />
        <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}>Sign Up</button>
        <p className="mt-2">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default SignUp;
