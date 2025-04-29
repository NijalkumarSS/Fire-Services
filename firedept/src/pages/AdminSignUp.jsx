import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminSignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname:"",
    email: "",
    phonenumber:"",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/auth/adminsignup", form);
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-end align-items-center vh-100 bg-light">
      <div className="card p-4 shadow " style={{ width: "450px",marginRight:'15rem'}}>
        <h3 className="mb-3 fw-bold">Sign Up</h3>
        <p>Sign up using your credentials</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label className="fw-bold mb-2">Firstname</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              placeholder=" Enter your firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label className="fw-bold mb-2">Lastname</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              placeholder=" Enter your lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label className="fw-bold mb-2">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter you email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label className="fw-bold mb-2">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phonenumber"
              placeholder=" Enter your phone number"
              value={form.phonenumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label className="fw-bold mb-2">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder=" Set your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="fw-bold mb-2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder=" Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <input type="hidden" name="role" value="ADMIN" />

          <button type="submit" className="btn btn-dark text-light w-100">Add Admin</button>
          <p className="text-danger mt-2">{message}</p>
        </form>
        <div className="text-center mt-2">
          <Link to="/adminlogin" className="text-decoration-none"><span className="text-dark">Already have an account?</span> Login</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
