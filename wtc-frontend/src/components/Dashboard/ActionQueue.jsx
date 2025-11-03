import React, { useState, useEffect } from "react";

function ActionQueue({ actions }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updated = {};
      actions.forEach(a => {
        const eta = new Date(a.eta_end);
        updated[a.id] = Math.max(0, Math.floor((eta - now) / 1000));
      });
      setTimeLeft(updated);
    }, 1000);
    return () => clearInterval(interval);
  }, [actions]);

  return (
    <div style={{ padding: "20px", border: "1px solid black", marginTop: "20px" }}>
      <h3>Action Queue</h3>
      {actions.map(a => (
        <div key={a.id} style={{ marginBottom: "10px" }}>
          <strong>{a.name}</strong> - Status: {a.status} - Time left: {timeLeft[a.id] || 0}s
          <br />
          Units: {a.units.join(", ")}
        </div>
      ))}
    </div>
  );
}

export default ActionQueue;
