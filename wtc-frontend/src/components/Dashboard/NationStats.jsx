import React from "react";

function NationStats({ nation }) {
  return (
    <div style={{ padding: "20px", border: "1px solid black", marginBottom: "10px" }}>
      <h2>{nation.name}</h2>
      <p>Population: {nation.population}</p>
      <p>GDP: ${nation.gdp}M</p>
      <p>Military: {nation.military.total} troops</p>
      <p>Unrest: {nation.unrest}%</p>
    </div>
  );
}

export default NationStats;
