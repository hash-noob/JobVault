import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registeration-CSS/RegistrationPage.css";

function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!adminCode || adminCode !== "ADMIN_SECRET") {
      setErrorMessage("Invalid admin code");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/admin/register", {
        name,
        email,
        password,
        isAdmin: "1"
      });

      if (response.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      if (error.response && error.response.data === "User already exists") {
        setErrorMessage("Email already registered");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="registration-container">
      <h1>Admin Registration</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adminCode">Admin Code</label>
          <input
            type="password"
            id="adminCode"
            className="form-control"
            placeholder="Admin Code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;
