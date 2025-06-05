import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import login from '../assets/login.jpg';

const VerifySignup = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const postValue = location.state?.postValue;

  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendTimer, resendDisabled]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const otpResponse = await axios.post("http://localhost:8080/otp/otp/verify-upload", {
        email,
        otp
      });

      if (otpResponse.data === "OTP verified") {
        alert("OTP Verified Successfully");

        const signupResponse = await axios.post('http://localhost:8080/project/Signup', postValue);

        if (signupResponse.data === 'Email exists') {
          alert('Email already exists');
        } else {
          alert("Register Successful");
          navigate("/login");
        }
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP or registering", error);
      alert("Verification or registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:8080/otp/send", { email });
      alert("OTP resent to your email.");
      setResendDisabled(true);
      setResendTimer(60);
    } catch (error) {
      console.error("Failed to resend OTP", error);
      alert("Failed to resend OTP.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body text-center">
          <h3 className="card-title mb-3">OTP Verification</h3>
          <p className="card-text">
            Please enter the OTP sent to your email: <strong>{email}</strong>
          </p>
          <input
            type="text"
            className="form-control my-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button
            className="btn backgroundColour text-white me-3 mt-1"
            onClick={handleVerify}
            disabled={loading || otp.length === 0}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            className="btn btn-dark mt-2"
            onClick={handleResend}
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifySignup;
