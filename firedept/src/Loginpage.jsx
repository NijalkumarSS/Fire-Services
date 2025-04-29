import React, { useState } from 'react';
import './App.css'
import './Logincss.css'
import SignUp from './pages/Signup';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from './assets/login.jpg'




const LoginPage = () => {


 
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/auth/login", {
      username,
      password,
    });

    const data = response.data;

    // ✅ Store token and role in localStorage
    localStorage.setItem("token", data.token);
    console.log(data.token);
    const name = data.username
    const email = data.email
    console.log(name);
    console.log(email);
    
    
    // localStorage.setItem("role", data.role); // Optional, if your backend returns role

    // ✅ Redirect to home page
    navigate("/userspage"); // Change this to your desired route

  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Invalid credentials!");
    } else {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  }
};

  return (

    <div className="container-fluid bg-light " 
    style={{
      backgroundImage: `url(${login})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height:'100vh'
  
    }} >
      
      <div className='d-flex flex-column'> 

      <form onSubmit={handleLogin} style={{marginTop :'5rem'}}>
      <div className="flex-grow-1 d-flex justify-content-end  align-items-center" style={{marginRight: "14rem",marginTop :'3rem'}}>
        <div className="card shadow-sm p-4" style={{ maxWidth: '450px', width: '100%',height:"440px" }}>
          <h2 className="fw-bold mb-1">Login</h2>
          <p className="text-muted h6">Enter your credentials to access your account</p>

          <div className="mb-3 mt-3">
            <label htmlFor="text" className="form-label h5">Username<span className="text-danger">*</span></label>
            <input type="text" className="form-control h5" name="username" placeholder="Enter your name" 
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>
          
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label htmlFor="password" className="form-label h5">Password
              <span className="text-danger">*</span>
              </label>
            </div>
            <input type="password" className="form-control h5" name="password" placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             />
          </div>

          <button className="btn btn-dark w-100 mt-4">Login</button>  
          <div className="text-center mt-3 small text-muted h5">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
