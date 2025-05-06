import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const AdminSignUp = ({ show, handleClose }) => {
  const [form, setForm] = useState({
    adminname: "",
    email: "",
    phonenumber: "",
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
      const response = await axios.post("http://localhost:8080/api/auth/adminsignup", form);
      setMessage("Admin registered successfully");
      handleClose();
    } catch (error) {
      setMessage(error.response?.data || "Signup failed");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Admin Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className="fw-bold">Firstname</Form.Label>
            <Form.Control
              type="text"
              name="adminname"
              placeholder="Enter your firstname"
              value={form.adminname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-bold">Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phonenumber"
              placeholder="Enter your phone number"
              value={form.phonenumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Set your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <input type="hidden" name="role" value="ADMIN" />

          <div className="d-grid mt-3">
            <Button variant="dark" type="submit">
              Add Admin
            </Button>
          </div>
        </Form>

        {message && <p className="text-danger mt-3">{message}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default AdminSignUp;
