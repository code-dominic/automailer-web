import {React  , useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import useToken from "./components/App/useToken";


import MainContainer from "./components/MainContainer";


const App = () => {

  const {token , setToken} = useToken();


  if(!token){
    return(
      <Router>
        <div className="wrapper">
          <Routes>
            <Route path="/login" element={<Login setToken={setToken}/>}/>
            <Route path="/register" element={<Register setToken ={setToken}/>}/>
          </Routes>
        
        </div>
      </Router>
    )
    
  }

  return (
    <Router>
      <div className="Wrapper">
        <Routes>
          <Route path="/" element={<MainContainer token={token} setToken={setToken}/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
