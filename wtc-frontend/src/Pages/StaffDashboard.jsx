import React from "react";

function StaffDashboard({ actions, events, territories, onApproveAction, onVetoAction }) {
  return (
    <div style={{ padding: "20px", border: "2px solid black", marginTop: "20px" }}>
      <h1>Staff Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Pending Battle Actions</h2>
        {actions.length === 0 && <p>No pending actions</p>}
        {actions.map(a => (
          <div key={a.id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "5px" }}>
            <strong>{a.name}</strong>
            <br />
            Units: {a.units.join(", ")}
            <br />
            Status: {a.status}
            <button onClick={() => onApproveAction(a.id)} style={{ margin: "5px" }}>Approve</button>
            <button onClick={() => onVetoAction(a.id)}>Veto</button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Event Feed</h2>
        {events.length === 0 && <p>No recent events</p>}
        {events.map(e => (
          <div key={e.id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "5px" }}>
            <strong>{e.type}</strong> - {e.description} - Status: {e.status || "N/A"}
          </div>
        ))}
      </div>

      <div>
        <h2>Territories Overview</h2>
        {territories.length === 0 && <p>No territories</p>}
        {territories.map(t => (
          <div key={t.id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "5px" }}>
            ID: {t.id} - Nation: {t.nation} - Color: <span style={{ color: t.color }}>{t.color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffDashboard;
