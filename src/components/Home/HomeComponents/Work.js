import React from "react";
import { motion } from "framer-motion";
import JobDescrip from "../Assets/jobdecript.png";
import ApplyJob from "../Assets/applyjob.png";
import CheckInterviewScheduled from "../Assets/checkinter.png";

const Work = () => {
  const workInfoData = [
    {
      image: JobDescrip,
      title: "See the Job Description",
      text: "Navigate to the Jobs tab in the header to view the list of companies participating in recruitment events. Stay informed about which companies are offering job opportunities through this intuitive interface.",
    },
    {
      image: ApplyJob,
      title: "Apply For Jobs",
      text: "Apply for jobs seamlessly through our platform. Browse available positions, submit applications, and track your progress all in one place, simplifying your job search process.",
    },
    {
      image: CheckInterviewScheduled,
      title: "Check the Interview Scheduled",
      text: "Stay updated on your interview schedule effortlessly. Access details about upcoming interviews, including date, time, and location, to ensure you're prepared and on time for each opportunity.",
    },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="work-section-wrapper"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div 
        className="work-section-top"
        variants={itemVariants}
      >
        <p className="primary-subheading" style={{
          color: "rgba(85,107,247,255)",
          fontSize: "50px",
          margin: "0 0 10px 0"
        }}>
          Work
        </p>
        <h1 className="primary-heading" style={{
          fontSize: "40px",
          margin: "0 0 20px 0",
          fontWeight: "700"
        }}>
          How It Works
        </h1>
        <p className="primary-text" style={{
          maxWidth: "700px",
          margin: "0 auto 50px auto",
          fontSize: "18px",
          lineHeight: "1.6",
          color: "#555"
        }}>
          Our JobVault streamlines the job search process by matching students with relevant job opportunities.
          We ensure seamless navigation and effective communication between students and recruiters.
        </p>
      </motion.div>

      <div className="work-section-bottom" style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px"
      }}>
        {workInfoData.map((data, index) => (
          <motion.div 
            className="work-section-info" 
            key={data.title}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
              width: "300px",
              padding: "30px 20px",
              backgroundColor: "#fff",
              borderRadius: "15px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <motion.div 
              className="info-boxes-img-container"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                marginBottom: "20px",
                backgroundColor: "rgba(85,107,247,0.1)",
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img 
                src={data.image} 
                alt={data.title} 
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain"
                }} 
              />
            </motion.div>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "rgba(85,107,247,255)",
              marginBottom: "15px"
            }}>
              {data.title}
            </h2>
            <p style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#666"
            }}>
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Work;
