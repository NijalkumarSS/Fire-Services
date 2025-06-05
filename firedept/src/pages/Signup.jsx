import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import login from '../assets/login.jpg'

export default function SignUp() {
  const navigate = useNavigate();

  const [postValue, setPostValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleValue = (event) => {
    setPostValue({ ...postValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, confirmpassword } = postValue;

    if (!username || !email || !password || !confirmpassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/otp/sendsignup", { email });
      if (response.data === "OTP sent to email.") {
        toast.success("OTP sent to email.");
        setTimeout(() => {
          navigate("/verifysignup", { state: { email, postValue } });
        }, 1500);
      } else {
        toast.error("OTP not sent");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div
        className="container-fluid mt-0"
        style={{
          backgroundImage: `url(${login})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        }}
      >
        <div className="d-flex justify-content-center">
          <div className="border rounded p-4 shadow bg-white mt-5" style={{ width: "400px" }}>
            <h3 className="mb-3 fw-bold textstyle">Sign Up</h3>
            <p className="text-muted">Create your account to get started</p>

            <form onSubmit={handleSubmit} className="mt-4">
              <label className="form-label textstyle">Full Name<span className="text-danger">{postValue.username === '' ? '*' : ''}</span></label>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
                <input type="text" className="form-control"
                  placeholder="Enter your name"
                  name="username"
                  onChange={handleValue} />
              </div>

              <label className="form-label textstyle">Email<span className="text-danger">{postValue.email === '' ? '*' : ''}</span></label>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                <input type="email" className="form-control" placeholder="Enter your email"
                  name="email"
                  onChange={handleValue} />
              </div>

              <label className="form-label textstyle">Password<span className="text-danger">{postValue.password === '' ? '*' : ''}</span></label>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-shield-lock-fill"></i></span>
                <input type="password" className="form-control"
                  placeholder="********"
                  name="password"
                  onChange={handleValue} />
              </div>

              <label className="form-label textstyle">Confirm Password<span className="text-danger">{postValue.confirmpassword === '' ? '*' : ''}</span></label>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-shield-lock-fill"></i></span>
                <input type="password" className="form-control"
                  placeholder="********"
                  name="confirmpassword"
                  onChange={handleValue} />
              </div>

              <button type="submit" className="btn btn-dark w-100">Sign Up</button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Already have an account? <Link to="/login" className="text-danger">Login</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
