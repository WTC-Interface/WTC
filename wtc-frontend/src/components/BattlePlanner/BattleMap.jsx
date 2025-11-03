// src/components/BattlePlanner/BattleMap.jsx
import React, { useState } from "react";

export default function BattleMap() {
  const [markers, setMarkers] = useState([
    { id: 1, x: 20, y: 30, label: "Unit A", color: "red" },
    { id: 2, x: 60, y: 50, label: "Unit B", color: "blue" },
  ]);

  const [tool, setTool] = useState("add"); // "add", "move", "delete"
  const [selectedMarker, setSelectedMarker] = useState(null);

  const addMarker = (e) => {
    if (tool !== "add") return;
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newMarker = { id: Date.now(), x, y, label: "New Unit", color: "green" };
    setMarkers([...markers, newMarker]);
    setSelectedMarker(newMarker.id);
  };

  const removeMarker = (id) => {
    setMarkers(markers.filter((m) => m.id !== id));
    if (selectedMarker === id) setSelectedMarker(null);
  };

  const updateMarker = (id, updates) => {
    setMarkers(markers.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "100vh" }}>
      {/* Top map + sidebar */}
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{ flex: 1, position: "relative", overflow: "hidden", cursor: tool === "add" ? "crosshair" : "grab" }}
          onClick={addMarker}
        >
          <img
            src="/worldmap.png"
            alt="World Map"
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 0 }}
          />

          {markers.map((marker) => (
            <div
              key={marker.id}
              draggable={tool === "move"}
              onClick={(e) => {
                e.stopPropagation();
                if (tool === "delete") removeMarker(marker.id);
                else setSelectedMarker(marker.id);
              }}
              onDragEnd={(e) => {
                const rect = e.currentTarget.parentElement.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                updateMarker(marker.id, { x, y });
              }}
              style={{
                position: "absolute",
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: marker.color,
                color: "white",
                padding: "4px 6px",
                borderRadius: "4px",
                fontSize: "12px",
                zIndex: 1,
                cursor: tool === "move" ? "grab" : "pointer",
                border: selectedMarker === marker.id ? "2px solid yellow" : "none",
              }}
            >
              {marker.label}
            </div>
          ))}
        </div>

        {/* Tools sidebar */}
        <div style={{ width: "200px", background: "#222", color: "white", padding: "10px" }}>
          <h3>Tools</h3>
          <button onClick={() => setTool("add")} style={{ display: "block", margin: "5px 0" }}>Add Marker</button>
          <button onClick={() => setTool("move")} style={{ display: "block", margin: "5px 0" }}>Move Marker</button>
          <button onClick={() => setTool("delete")} style={{ display: "block", margin: "5px 0" }}>Delete Marker</button>
          <p>Current Tool: <b>{tool}</b></p>
        </div>
      </div>

      {/* Bottom card panel */}
      <div style={{ display: "flex", background: "#333", padding: "10px", overflowX: "auto" }}>
        {markers.map((marker) => (
          <div
            key={marker.id}
            style={{
              background: "#555",
              color: "white",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "8px",
              minWidth: "150px",
              border: selectedMarker === marker.id ? "2px solid yellow" : "none",
            }}
            onClick={() => setSelectedMarker(marker.id)}
          >
            <p><b>{marker.label}</b></p>
            <input
              type="text"
              value={marker.label}
              onChange={(e) => updateMarker(marker.id, { label: e.target.value })}
              style={{ width: "100%", marginBottom: "5px" }}
            />
            <input
              type="color"
              value={marker.color}
              onChange={(e) => updateMarker(marker.id, { color: e.target.value })}
              style={{ width: "100%" }}
            />
            <button onClick={() => removeMarker(marker.id)} style={{ marginTop: "5px", width: "100%" }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
