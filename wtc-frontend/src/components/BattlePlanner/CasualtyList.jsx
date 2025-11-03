import React from "react";

function CasualtyList({ casualties }) {
  return (
    <div style={{ padding: "20px", border: "1px solid black", marginBottom: "10px" }}>
      <h3>Casualties</h3>
      {casualties.map((c, idx) => (
        <div key={idx}>{c.rank} {c.name} ({c.unit})</div>
      ))}
    </div>
  );
}

export default CasualtyList;
