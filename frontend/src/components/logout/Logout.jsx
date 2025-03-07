
// import {react , useEffect , useState} from react;
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Logout({token , setToken}){

    const navigate = useNavigate();

    const handelLogout = async ()=>{
        localStorage.removeItem('token');
        setToken();
        navigate('/login');
    }
    
    return (
        // <button onClick={handelLogout}>Logout</button>
        <Button variant="danger" className="w-100 mb-3" onClick={handelLogout} style={{boxShadow: "0 4px 10px rgba(0, 0, 0, 2.2)"}}>
                            Logout
                          </Button>
    )

}