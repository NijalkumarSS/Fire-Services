// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../assets/login.jpg'

import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    try {
      await axios.put("http://localhost:8080/project/reset-password", {
        email,
        newPassword
      });
      toast.success("Password reset successful!", { position: "top-center" });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error("Invalid or expired token!", { position: "top-center" });
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

      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className="card  mx-auto" style={{ maxWidth: '400px', padding:'40px' }}>
        <h4 className="mb-3 text-center textstyle">Reset Password</h4>
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className='textstyle'>New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className='textstyle'>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 textstyle">Reset Password</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
