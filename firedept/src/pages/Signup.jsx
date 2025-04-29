import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import login from '../assets/login.jpg'

export default function SignUp() {

  const navigate =useNavigate();

  const[postValue,setPostValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  })

  const[data,setData] = useState('')

  const handleValue = (event) => {
    setPostValue({...postValue,[event.target.name]:event.target.value})
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

     if(postValue.password == postValue.confirmpassword){
      const response = await axios.post("http://localhost:8080/project/Signup",postValue)
      if(response.data === 'Email exists'){
        alert('Email already exists')
      }
      else{
        if(postValue.username == "" || postValue.email == "" || postValue.password == "" || postValue.confirmpassword == ""){
          alert("Please fill all the fields");  
        }
        else{
          navigate("/login")
        }
      }
    }
    else {
      alert("Passwords do not match");
    }
  }

 
  return (
    <>
  <div className="container-fluid mt-0" 
    style={{
      backgroundImage: `url(${login})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height:'100vh',
    }}>
    <div className="d-flex justify-content-end "  
      style={{
          marginRight: "15rem",
          marginLeft: "55rem"
        }}>
     
      <div className="border rounded p-4 shadow bg-white mt-5 " style={{ width: "400px"}}>
        <h3 className="mb-3 fw-bold">Sign Up</h3>
        <p className="text-muted">Create your account to get started</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" 
            placeholder="Enter your name" 
            name="username"
            
            onChange={handleValue}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" 
            name="email"
            onChange={handleValue}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" 
            placeholder="********" 
            name="password"
            onChange={handleValue}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" 
            placeholder="********" 
            name="confirmpassword"
            onChange={handleValue}/>
          </div>

          <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
