import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function Login({setToken}){
    const navigate = useNavigate();


    const [username , setUsername] = useState();
    const [password , setPassword] = useState();
    const [error , setError] = useState("");
 


    const handleSubmit = async ()=>{
        try{
            const res = await axios.post('http://localhost:5000/login' , {username , password});
            setToken(res.data.token);
            navigate('/');
        }catch(err){
            alert(err.message);
            console.log(err);
        }

    }

    const onClickRegister = ()=>{
        navigate('/register');
    }

    return(
        <div className="login-wrapper">
        <h1><b>Login</b> / <span onClick={onClickRegister} >Register</span></h1>
            <label>
                <p>UserName: {username} </p>
                <input type="text" onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Password : {password}</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            <div>
               { error}
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
  