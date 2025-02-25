import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function Register({setToken}){

    const navigate = useNavigate();

    const [email , setEmail] = useState("");
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");



    const handleSubmit = async ()=>{
        try{
            const res = await axios.post('http://localhost:5000/register' , {username , password , email});
            setToken(res.data.token);
            navigate('/');
        }catch(err){
            console.log(err);
        }

    }

    const loginClick = ()=>{
        navigate('/login');
    }

    return(
        <div className="register-wrapper">
        <h1><b>Register</b>/ <span onClick={loginClick}>Login</span></h1>
            <label>
                <p>Email: {email} </p>
                <input type="email" onChange={e => setEmail(e.target.value)} />
            </label>
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
        </div>
    )
}

Register.PropTypes = {
    setToken : PropTypes.func.isRequired
}