import React from "react";

function PhaseTimeline({ phases }) {
  return (
    <div style={{ padding: "20px", border: "1px solid black", marginBottom: "10px" }}>
      <h3>Operation Phases</h3>
      {phases.map((p, idx) => (
        <div key={idx}>
          <strong>{p.name}</strong>: {p.eta_start} → {p.eta_end} (Units: {p.units.join(", ")})
        </div>
      ))}
    </div>
  );
}

export default PhaseTimeline;
