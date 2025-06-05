import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';




const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); 
  const [resendDisabled, setResendDisabled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const formData = location.state?.formData;
  
  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendTimer, resendDisabled]);

  
  if (!formData) {
  alert("Form data is missing. Please start over.");
  navigate("/upload");
  return;
}

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/otp/otp/verify-upload", {
        email,
        otp
      });

      if (response.data === "OTP verified") {
        alert("OTP Verified Successfully");
     
      const uploadData = new FormData();
      uploadData.append('uploadername', formData.uploadername);
      uploadData.append('age', parseInt(formData.age, 10));
      uploadData.append('dob', formData.dob);
      uploadData.append('gender', formData.gender);
      uploadData.append('email', formData.email);
      uploadData.append('designation', formData.designation);
      uploadData.append('adharno', formData.adharno);
      uploadData.append('pancardno', formData.pancardno);
      uploadData.append('address', formData.address);
      uploadData.append('mobilenumber', formData.mobilenumber);
      uploadData.append('building', formData.building);
      uploadData.append('documentType', formData.documentType);
      uploadData.append('location', formData.location); 
      uploadData.append('pincode', formData.pincode); 
      uploadData.append('notes', formData.notes);   
      uploadData.append('file', formData.file); 
      uploadData.append('image', formData.image);
  
       const uploadresponse = await axios.post('http://localhost:8080/project/upload', uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        if (uploadresponse.data === "Upload failed") {
          alert("Upload failed");
        } else {
          console.log('Upload Success:', uploadresponse.data);
          navigate("/uploadsuccess")
        }
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Resend OTP
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

export default VerifyOTP;
