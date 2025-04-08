import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Admin-CSS/AdminNav.css';
import axios from "axios";

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear client-side tokens
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    
    // 2. Clear cookies
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 3. Invalidate server-side session
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {}, {
      withCredentials: true // Important for sending cookies
    })
    .then(() => {
      // 4. Navigate to login page
      navigate("/");
    })
    .catch((error) => {
      console.error("Logout error:", error);
      // Even if there's an error, still navigate to login
      navigate("/");
    });
  };

  return (
    <body>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand me-auto" to="/">JobVault</a>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">JobVault</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/admin">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/admindashboard">Reports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/companies">Manage Companies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/scheduledinterviewdata">Interview Reports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/" onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button className="navbar-toggler login-button pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon login-button"></span>
          </button>
      </nav>


      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
        crossOrigin="anonymous">
      </script>
    </body>
  );
}



export default AdminHome;
