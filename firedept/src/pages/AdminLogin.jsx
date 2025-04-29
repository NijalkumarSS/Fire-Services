import React, { useState } from "react";
import axios from "axios";

const AdminLogin = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ADMIN",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", form);
      setMessage(response.data);
      onLoginSuccess();
    } catch (error) {
      setMessage(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-end align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px",marginRight: "15rem" }}>
        <h3 className="mb-3">Login</h3>
        <p className="text-muted">Enter your credentials to access your account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <input type="hidden" name="role" value="ADMIN" />

          <button type="submit" className="btn btn-dark w-100 mb-2">
            Login
          </button>
          <p className="text-danger">{message}</p>
        </form>
        <div className="text-center mt-2">
          <a href="/signup" className="text-decoration-none">Don't have an account? Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
