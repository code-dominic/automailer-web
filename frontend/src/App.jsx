import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
// import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <MainContainer/>
  );
};

export default App;
