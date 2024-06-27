import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import searchImage from "../../assets/images/search.svg";
import appImage from "../../assets/images/app.svg";
import expandImage from "../../assets/images/expand.svg";
import NotificationImage from "../../assets/images/notifications.svg";
import Logo from "../../assets/images/LogoImage.jpg";
import AvatarImage from "../../assets/images/AvatarImageIhab.jpg";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout'); // Update this URL with your actual logout endpoint
      navigate("/login"); // Navigate back to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to = "/">
          <img src={Logo} alt="" />
        </Link>
        
      </div>
      <div className="icons">
        <img src={searchImage} alt="" className="icon" />
        <img src={appImage} alt="" className="icon" />
        <img src={expandImage} alt="" className="icon" />
        <div className="notification">
          <img src={NotificationImage} alt="" />
          <span>1</span>
        </div>
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="user">
            <Link to = "/profile">
              <img src={AvatarImage} alt="" />
            </Link>
            <Link to ="/profile">
              <span>Ihab</span>
            </Link>    
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
}

export default Navbar;
