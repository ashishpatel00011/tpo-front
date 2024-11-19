import React from "react";
import "./tpo.css";

const Tpo = () => {
  return (
    <div className="home22">
      <h1 className="home22-intro-title">
        Preparation fuels achievement.
      </h1>
      <div className="home22-intro-text">
        <p className="para">
          Remember, preparation is key, but it's also important to stay
          motivated, focused, and believe in yourself. Good luck with
          your placement preparation!
        </p>
        <p className="links">
          <a href="/register" className="reg">Register</a>
          <a href="/home">Explore here</a>
        </p>
        <p>
          Equip yourself with essential skills and seize opportunities
          with top companies like...
        </p>
        <div className="client_logos">
          <img
            src="/companies/accenture.png"
            alt="Accenture"
          />
          <img
            src="/companies/cognizent.jpeg"
            alt="Cognizant"
          />
          <img
            src="/companies/tech.png"
            alt="Tech"
          />
          <img
            src="/companies/cap.png"
            alt="Cap"
          />
          <img
            src="/companies/tcs.png"
            alt="TCS"
          />
          <img
            src="/companies/infosis.png"
            alt="Infosys"
          />
          <img
            src="/companies/LTInfotech.jpg"
            alt="LT Infotech"
          />
          <img
            src="/companies/HCL.jpg"
            alt="HCL"
          />
        </div>
      </div>
    </div>
  );
};

export default Tpo;
