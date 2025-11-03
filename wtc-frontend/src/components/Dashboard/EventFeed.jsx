import React from "react";

function EventFeed({ events }) {
  return (
    <div style={{ padding: "20px", border: "1px solid black", marginBottom: "10px", maxHeight: "200px", overflowY: "auto" }}>
      <h3>Active Events</h3>
      {events.map(e => (
        <div key={e.id} style={{ marginBottom: "10px" }}>
          <strong>{e.type}</strong>: {e.description} (Severity: {e.severity})
        </div>
      ))}
    </div>
  );
}

export default EventFeed;
