import React from "react";

function EventEditor({ event, onChange }) {
  return (
    <div style={{ padding: "20px", border: "1px solid black", marginBottom: "10px" }}>
      <h3>Edit Event</h3>
      <label>Type: <input value={event.type} onChange={e => onChange({...event, type: e.target.value})} /></label><br/>
      <label>Description: <input value={event.description} onChange={e => onChange({...event, description: e.target.value})} /></label><br/>
      <label>Severity: <input value={event.severity} onChange={e => onChange({...event, severity: e.target.value})} /></label>
    </div>
  );
}

export default EventEditor;
