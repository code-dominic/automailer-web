import React, { useState } from 'react';
import { Mail, Send, Users, BarChart3, Shield, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavBar = () =>{
     const [activeNav, setActiveNav] = useState('home');
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Mail className="me-2 text-primary" size={32} />
            <span className="fw-bold fs-4 text-primary">AutoMailer</span>
          </a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {['home', 'login', 'register', 'contact us', 'about'].map((item) => (
                <li className="nav-item" key={item}>
                  <a 
                    className={`nav-link fw-medium ${activeNav === item ? 'text-primary' : 'text-dark'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(item);
                      navigate(`/${item}`);
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
}


export default NavBar;