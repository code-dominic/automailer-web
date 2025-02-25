
// import {react , useEffect , useState} from react;
import { useNavigate } from "react-router-dom";

export default function Logout({token , setToken}){

    const navigate = useNavigate();

    const handelLogout = async ()=>{
        localStorage.removeItem('token');
        setToken();
        navigate('/login');
    }
    
    return (
        <button onClick={handelLogout}>Logout</button>
    )

}