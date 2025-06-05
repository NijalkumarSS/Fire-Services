import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyForgotPassword = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      alert("No email found. Redirecting to Forgot Password.");
      navigate("/forgotpassword");
    }
  }, [email, navigate]);

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
      const response = await axios.post("http://localhost:8080/otp/otp/verify-upload", {
        email,
        otp
      });

      if (response.data === "OTP verified") {
        alert("OTP Verified Successfully");
        navigate("/resetpassword", { state: { email } });
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
      alert("OTP Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:8080/otp/sendforgotpasswor", { email });
      alert("OTP resent to your email.");
      setResendDisabled(true);
      setResendTimer(60);
    } catch (error) {
      console.error("Failed to resend OTP", error);
      alert("Failed to resend OTP.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center" style={{ maxWidth: "400px" }}>
        <h3>OTP Verification</h3>
        <p>
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
          className="btn btn-secondary mt-2"
          onClick={handleResend}
          disabled={resendDisabled}
        >
          {resendDisabled ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyForgotPassword;
