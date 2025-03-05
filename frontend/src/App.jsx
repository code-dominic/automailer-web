import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import useToken from "./components/App/useToken";
import DashBoard from './components/Dashboard/DashBoard';
import PersonDataDashboard from "./components/personDataDashboard/PersonDataDashboard";

const App = () => {
  const { token, setToken } = useToken();
  const navigate = useNavigate(); // useNavigate must be inside Router

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<DashBoard token={token} setToken={setToken} />} />
          <Route path="/emails" element={<PersonDataDashboard token={token} setToken={setToken} />} />
        </>
      )}
    </Routes>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
