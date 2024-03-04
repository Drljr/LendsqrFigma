import React from 'react';
import logo from '../Asssets/Group.png';
import bg from '../Asssets/pablo-sign-in 1.png';
import './Login.css';
// import Dash from '../Dashboard/Dash.jsx';
import { useState } from 'react';
import axios from 'axios';// import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");

  async function hashPassword(password) {
    // Implement your hashing logic here (e.g., using a library like bcrypt)
    return password; // Replace with the actual hashed password
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashedPassword = await hashPassword(password); // Utilize a hashing library

    try {
      const response = await axios.post('/api/login', {
        email,
        password: hashedPassword
      });

      // Handle successful login (e.g., store token, redirect)
      console.log('Login successful:', response.data);

    } catch (error) {
      // Handle login errors
      console.error('Login error:', error);
    }
  };




  const [visible, setVisible] = useState(false);
  const handleVisible = () => { setVisible(!visible) }
  const navigate = useNavigate();
  const handleClick = () => { navigate("../Dashboard") }

  return (
    <div className="body">
      <div className="container">
        <img src={logo} alt="sign in" className="logo" />
        <img src={bg} alt="bg" className="bg" />
      </div>
      <div className="Wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h1>
            <b>Welcome!</b>
          </h1>
          <p>Enter details to login</p>
          <div className="input-box">
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" required />
          </div>
          <div className="input-box">
            <input
              value={password}
              type={visible ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <div className="label" onClick={handleVisible}>
              {visible ? <label> HIDE </label> : <label> SHOW </label>}
            </div>
          </div>
          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>
          <button type='submit' onClick={handleClick}>
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;