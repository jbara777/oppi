import React from 'react';
import LoginForm from "../../components/Loginform/LoginForm";
import "./LoginPage.scss";
import LoginImage from "../../assets/images/LoginPageImage.jpg";

function LoginPage() {
  return (
    <div className='LoginPage'>
        <div className="imgContainer">
            <img src={LoginImage} alt="Login Image"/>
        </div>
        <div className="loginFormContainer">
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage