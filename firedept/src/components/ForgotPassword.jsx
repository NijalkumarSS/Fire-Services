import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../assets/login.jpg';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/project/check-email', { email });
      await axios.post("http://localhost:8080/otp/sendforgotpasswor", { email });
      toast.success("Reset link sent to your email!", { position: "top-center" });
      navigate("/verifyforgotpass", { state: { email } });
    } catch (error) {
      toast.error("Failed to send reset link. Try again!", { position: "top-center" });
    }
  };
  return (
    <div className="container-fluid"
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}>
      <ToastContainer />

      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h4 className="mb-3 text-center textstyle">Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className='textstyle'>Enter your Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark text-white w-100 textstyle">Send Reset Link</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none textstyle text-danger">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
