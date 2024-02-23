import React from "react";
import video from '../../assets/video.webm'
import { Link } from 'react-router-dom';




const HomePage = () => {
  
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <video
        src={video}
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          zIndex: -1, 
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          zIndex: 1, 
        }}
      >
         Product and store management system
        <div>
          <Link to="/login">
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;