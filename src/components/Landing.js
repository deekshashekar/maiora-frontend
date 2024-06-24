import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import landing from "../assets/landing.png";

const Landing = () => {
  const [activeTab, setActiveTab] = useState(1);

  const comps = [
    { id: 1, tabHeading: "Login", content: <Login /> },
    { id: 2, tabHeading: "Register", content: <Register /> },
  ];

  const handleClick = (id) => {
    setActiveTab(activeTab === id ? null : id);
  };
  return (
    <div className="landing-container">
      <img src={landing} alt="bg-image" className="landing-img" />
      <div className="landing-comp">
        {comps.map((item) => {
          return (
            <div>
              <h1
                onClick={() => handleClick(item.id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: activeTab === item.id ? "yellow" : "white",
                  borderRadius: "20px",
                  marginTop: "200px",
                  textAlign: "center",
                }}
              >
                {item.tabHeading}
              </h1>
              <div
                className="comp-content"
                style={{
                  display: activeTab === item.id ? "block" : "none",
                }}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Landing;
