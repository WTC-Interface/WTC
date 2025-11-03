import React, { useState, useEffect } from "react";
import worldMap from "./assets/worldmap.png";
import "./App.css";

const BACKEND_URL = "http://localhost:3001";

function App() {
  const [user, setUser] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [activeTool, setActiveTool] = useState("Overview");

  const tools = ["Overview", "Diplomacy", "Economy", "Military", "Research"];
  const managementCards = [
    "Funding",
    "Companies",
    "Speech Events",
    "Elections",
    "Healthcare",
    "Education",
    "Police & Crime",
    "Environment",
    "Infrastructure",
  ];

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/auth/check`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setCountryData(data.country);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  if (!user)
    return (
      <div className="login-page">
        <h1>Login with Discord to manage your country</h1>
        <a
          className="login-btn"
          href={`${BACKEND_URL}/api/auth/discord`}
        >
          Login with Discord
        </a>
      </div>
    );

  return (
    <div className="app">
      <div className="map-header">
        🌍 <span>World Map - {user.username}'s Country</span>
      </div>

      <div className="map-container">
        <img src={worldMap} alt="World Map" className="world-map" />

        {/* Right-side tool panel */}
        <div className="tool-panel">
          <h3>Tools</h3>
          {tools.map((tool) => (
            <button
              key={tool}
              className={`tool-btn ${activeTool === tool ? "active" : ""}`}
              onClick={() => setActiveTool(tool)}
            >
              {tool}
            </button>
          ))}
        </div>

        {/* Bottom management cards */}
        <div className="control-bar">
          {managementCards.map((card) => (
            <div
              key={card}
              className="control-card"
              onClick={() => setActiveCard(card)}
            >
              {card}
            </div>
          ))}
        </div>

        {/* Pop-up mini UI */}
        {activeCard && (
          <div className="popup">
            <div className="popup-content">
              <h2>{activeCard}</h2>
              <p>Manage your country's {activeCard.toLowerCase()} here.</p>

              <div className="popup-controls">
                <button>Increase</button>
                <button>Decrease</button>
                <button>View Reports</button>
              </div>

              <button
                className="close-btn"
                onClick={() => setActiveCard(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

