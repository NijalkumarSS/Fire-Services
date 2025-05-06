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


 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });

    const data = response.data;
    

    localStorage.setItem("token", data.token);
    console.log(data.token);
    const name = data.username
    const useremail = data.email
    
  
    alert("Login Successful")
    navigate("/userspage",{
      state: {
        username:name,
        useremail: useremail,
      }});

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
      <div className="flex-grow-1 d-flex justify-content-center  align-items-center" style={{marginTop :'3rem'}}>
        <div className="card shadow-sm p-4" style={{ maxWidth: '450px', width: '100%',height:"440px" }}>
          <h2 className="fw-bold mb-1 textstyle">Login</h2>
          <p className="text-muted h6">Enter your credentials to access your account</p>

          <label htmlFor="text" className="form-label h5 mt-3 textstyle">Email<span className="text-danger">{email === '' ? "*" : ''}</span></label>

          <div className="mb-3 input-group">
            <span className='input-group-text'><i className="bi bi-person-circle"></i></span><input type="text" className="form-control" name="email" placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>
          
          <div className="d-flex justify-content-between">
              <label htmlFor="password" className="form-label h5 textstyle">Password
              <span className="text-danger">{password === '' ? '*' : ''}</span>
              </label>
            </div>
          <div className="mb-2 input-group">  
            <span className='input-group-text'><i className="bi bi-shield-lock-fill"></i></span><input type="password" className="form-control" name="password" placeholder="Password"
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
