import React, { useState, useEffect } from 'react';
import '../CSS/Signin.css';
import eye from '../Images/eye.png';
import logolight from '../Images/logolight.png';

const messages = [
  '"The theme is really great with an amazing customer support."',
  '"Easy to use, super flexible, and visually stunning design."',
  '"A perfect choice for any modern application needs."'
];

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (username.trim() === '' || password.trim() === '') {
      alert('Username and Password cannot be blank.');
    } else {
      console.log('Username:', username);
      console.log('Password:', password);
    }
  };

  return (
    <div className='mainScreen'>
      <div className="mainCont">
        <div className="imgSection">
          <div className="overlay">
            <img src={logolight} alt="logo"  className='logo1'/>
            <div className="overlay-text">
              {messages[currentIndex]}
            </div>
            <div className="sliders">
              {messages.map((_, index) => (
                <span
                  key={index}
                  className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                ></span>
              ))}
            </div>
          </div>
        </div>

        <div className="SignInSection">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to Velzon.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="show-password-btn"
              >
                <img src={eye} className='eyeIcon' alt="Toggle visibility" />
              </button>
            </div>

            <a href="#" className="forgot-password">Forgot password?</a>

            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className='bt1'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
