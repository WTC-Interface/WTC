import React from "react";

function NationEditor({ nation, onChange }) {
  return (
    <div style={{ padding: "20px", border: "1px solid black", marginBottom: "10px" }}>
      <h3>Edit Nation</h3>
      <label>Name: <input value={nation.name} onChange={e => onChange({...nation, name: e.target.value})} /></label><br/>
      <label>Population: <input value={nation.population} onChange={e => onChange({...nation, population: e.target.value})} /></label><br/>
      <label>GDP: <input value={nation.gdp} onChange={e => onChange({...nation, gdp: e.target.value})} /></label><br/>
      <label>Military: <input value={nation.military.total} onChange={e => onChange({...nation, military: {...nation.military, total: e.target.value}})} /></label><br/>
      <label>Unrest: <input value={nation.unrest} onChange={e => onChange({...nation, unrest: e.target.value})} /></label>
    </div>
  );
}

export default NationEditor;
