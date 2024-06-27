import React, { useState } from 'react';
import "./LoginForm.scss";
import Logo from "../../assets/images/LogoImage.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import eyeOpen from "../../assets/images/eyeOpen.svg";
import eyeClosed from "../../assets/images/eyeClosed.svg";

function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = {};

    if (!values.email) {
      formErrors.email = "Please enter your email.";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!values.password) {
      formErrors.password = "Please enter your password.";
    } else if (!passwordRegex.test(values.password)) {
      formErrors.password = "Password must be at least 7 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    if (!recaptchaToken) {
      formErrors.recaptcha = "Please complete the reCAPTCHA.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      axios.post('http://localhost:3001/api/auth/login', { ...values, recaptchaToken })
        .then(res => {
          if (res.data.Status === "Success") {
            navigate('/');
          } else {
            alert("Error");
          }
        })
        .catch(err => console.log(err));
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrors(prevErrors => ({ ...prevErrors, recaptcha: '' }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='LoginForm'>
      <div className="loginFormContainer">
        <img src={Logo} alt="logo" />
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder='Enter Your Email'
            onChange={e => {
              setValues({ ...values, email: e.target.value });
              setErrors(prevErrors => ({ ...prevErrors, email: '' }));
            }}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          
          <label htmlFor="password">Password:</label>
          <div className="inputContainer">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder='Enter your Password'
              onChange={e => {
                setValues({ ...values, password: e.target.value });
                setErrors(prevErrors => ({ ...prevErrors, password: '' }));
              }}
            />
            <img
              className="togglePassword"
              src={showPassword ? eyeOpen : eyeClosed}
              alt={showPassword ? "Hide Password" : "Show Password"}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="recContainer">
            <ReCAPTCHA
              sitekey="6Lf3pAIqAAAAAPQS61feXOtEPmUpXACXH7gZL5A0"
              onChange={handleRecaptchaChange}
            />
          </div>
          {errors.recaptcha && <p className="error">{errors.recaptcha}</p>}
          
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
