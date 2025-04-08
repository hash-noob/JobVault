import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../HomeComponents/Navbar.js";
import Footer from "../HomeComponents/Footer.js";
import scheduleimage from '../Assets/scheduleding.png';

function ScheduledInterview() {
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`).then((res) => {
      if (!res.data.status) {
        navigate("/");
      }
    });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/currentUser`)
      .then((res) => {
        setCurrentUser(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchScheduledInterviews = async () => {
        setIsLoading(true);
        try {
          const userId = currentUser._id;

          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/auth/scheduledInterviews/${userId}`
          );
          setScheduledInterviews(response.data.scheduledInterviews);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchScheduledInterviews();
    }
  }, [currentUser]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '20px',
          paddingTop: '100px'
        }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ 
            textAlign: "center", 
            marginBottom: "40px", 
            color: "rgba(85,107,247,255)",
            fontSize: "2.5rem",
            fontWeight: "700"
          }}
        >
          Scheduled Interviews
        </motion.h1>

        <div style={{
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          minHeight: "60vh",
          gap: "30px"
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={scheduleimage}
              alt="Scheduled Interview Illustration"
              style={{
                maxWidth: "80%",
                borderRadius: "12px",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              }}
            />
          </motion.div>

          <div style={{
            flex: "1",
            overflowY: "auto",
            padding: "20px",
          }}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  border: '4px solid #f3f3f3', 
                  borderTop: '4px solid rgba(85,107,247,255)', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite' 
                }}></div>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            ) : (
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  listStyleType: "none",
                  padding: "0",
                  margin: "0",
                }}
              >
                {scheduledInterviews.length > 0 ? (
                  scheduledInterviews.map((interview, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      whileHover={{ 
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)",
                        y: -5
                      }}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "16px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        transition: "all 0.3s ease",
                        border: "1px solid rgba(85,107,247,0.1)"
                      }}
                    >
                      <p style={{ 
                        margin: "0 0 10px 0", 
                        fontSize: "1.3rem", 
                        color: "#333",
                        fontWeight: "600"
                      }}>
                        <span style={{ 
                          color: "rgba(85,107,247,255)", 
                          marginRight: "8px",
                          fontSize: "1.1rem"
                        }}>
                          Company:
                        </span>
                        {interview.companyName}
                      </p>
                      <p style={{ 
                        margin: "0", 
                        fontSize: "1.1rem", 
                        color: "#555"
                      }}>
                        <span style={{ 
                          color: "rgba(85,107,247,255)", 
                          marginRight: "8px",
                          fontSize: "1.1rem"
                        }}>
                          Interview Date:
                        </span>
                        {interview.interviewDate}
                      </p>
                    </motion.li>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ 
                      textAlign: "center", 
                      padding: "40px 20px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    <p style={{ 
                      color: "#666", 
                      fontSize: "1.1rem",
                      margin: "0"
                    }}>
                      No scheduled interviews found.
                    </p>
                  </motion.div>
                )}
              </motion.ul>
            )}
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default ScheduledInterview;
