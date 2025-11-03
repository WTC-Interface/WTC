import React, { useState, useEffect } from "react";
import BattleMap from "../components/BattlePlanner/BattleMap";
import ActionQueue from "../components/Dashboard/ActionQueue";
import StaffDashboard from "../components/StaffPanel/StaffDashboard";
import EventFeed from "../components/Dashboard/EventFeed";

function PlayerDashboard() {
  const [actions, setActions] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [events, setEvents] = useState([]);
  const [funds, setFunds] = useState(10000);
  const [units, setUnits] = useState(["Alpha", "Bravo", "Charlie", "Delta"]);

  // Generate random events
  useEffect(() => {
    const interval = setInterval(() => {
      const event = generateRandomEvent();
      setEvents(prev => [...prev, event]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomEvent = () => {
    const types = ["Funding Request", "Lawsuit", "Natural Disaster"];
    const type = types[Math.floor(Math.random() * types.length)];
    switch (type) {
      case "Funding Request":
        return {
          id: Date.now(),
          type,
          description: `Agency requests $${Math.floor(Math.random() * 500 + 50)}M`,
          amount: Math.floor(Math.random() * 500 + 50),
          status: "Pending",
        };
      case "Lawsuit":
        return {
          id: Date.now(),
          type,
          description: `Company sues the nation for $${Math.floor(Math.random() * 300 + 20)}M`,
          amount: Math.floor(Math.random() * 300 + 20),
          status: "Pending",
        };
      case "Natural Disaster":
        return {
          id: Date.now(),
          type,
          description: `Disaster strikes! Repair costs $${Math.floor(Math.random() * 700 + 100)}M`,
          amount: Math.floor(Math.random() * 700 + 100),
          status: "Pending",
        };
      default:
        return {};
    }
  };

  const handleEventAction = (id, approve) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id !== id) return e;
        if (approve) {
          setFunds(f => f - e.amount);
          if (e.type === "Natural Disaster") {
            if (territories.length > 0) {
              const index = Math.floor(Math.random() * territories.length);
              const updated = [...territories];
              updated[index].color = "#FFA500";
              updated[index].nation = "Damaged";
              setTerritories(updated);
            }
            if (units.length > 0) {
              const index = Math.floor(Math.random() * units.length);
              const removedUnit = units[index];
              setUnits(prev => prev.filter((_, i) => i !== index));
              setEvents(prevEvents => [
                ...prevEvents,
                { id: Date.now(), type: "Casualty", description: `${removedUnit} lost due to disaster`, severity: 5 },
              ]);
            }
          }
        }
        return { ...e, status: approve ? "Approved" : "Denied" };
      })
    );
  };

  const handleZoneCreated = feature => {
    const assignedUnits = prompt(`Assign units (available: ${units.join(", ")})`);
    if (!assignedUnits) return;
    const selectedUnits = assignedUnits.split(",").map(u => u.trim()).filter(u => units.includes(u));
    if (selectedUnits.length === 0) return alert("No valid units selected");

    const newAction = {
      id: Date.now(),
      name: "Attack Zone",
      status: "Pending",
      feature,
      units: selectedUnits,
    };

    setActions([...actions, newAction]);
    setTerritories([...territories, { id: newAction.id, geojson: feature, color: "#FFA500", nation: "Pending" }]);
    setUnits(prev => prev.filter(u => !selectedUnits.includes(u)));
  };

  const approveAction = id => {
    setActions(prev => prev.map(a => (a.id === id ? { ...a, status: "Approved" } : a)));
    resolveBattle(id);
  };

  const vetoAction = id => {
    setActions(prev => prev.map(a => (a.id === id ? { ...a, status: "Vetoed" } : a)));
    setTerritories(prev =>
      prev.map(t => (t.id === id ? { ...t, color: "#ff0000", nation: "Vetoed" } : t))
    );
    const action = actions.find(a => a.id === id);
    if (action) setUnits(prev => [...prev, ...action.units]);
  };

  const resolveBattle = id => {
    const action = actions.find(a => a.id === id);
    if (!action) return;

    const casualties = action.units.map(u => ({ name: u, lost: Math.random() < 0.3 }));
    setTerritories(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, color: "#00ff00", nation: "Conquered" }
          : t
      )
    );

    setEvents(prev => [
      ...prev,
      {
        id: Date.now(),
        type: "Battle",
        description: `${action.units.join(", ")} attacked. Casualties: ${
          casualties.filter(c => c.lost).map(c => c.name).join(", ") || "None"
        }`,
        severity: 5,
      },
    ]);

    const surviving = casualties.filter(c => !c.lost).map(c => c.name);
    setUnits(prev => [...prev, ...surviving]);
  };

  const handleStaffMapClick = actionId => {
    const action = actions.find(a => a.id === actionId);
    if (!action) return;
    const choice = prompt(`Approve or veto ${action.name}? Type "approve" or "veto":`);
    if (choice?.toLowerCase() === "approve") approveAction(actionId);
    else if (choice?.toLowerCase() === "veto") vetoAction(actionId);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Player Dashboard</h1>
      <p>Nation Funds: ${funds}M</p>
      <p>Units Available: {units.join(", ") || "None"}</p>

      <BattleMap
        territories={territories}
        onZoneCreated={handleZoneCreated}
        isStaff={true}
        onStaffAction={handleStaffMapClick}
      />

      <ActionQueue actions={actions} />
      <EventFeed events={events} />

      <StaffDashboard
        actions={actions.filter(a => a.status === "Pending")}
        events={events}
        territories={territories}
        onApproveAction={approveAction}
        onVetoAction={vetoAction}
      />
    </div>
  );
}

export default PlayerDashboard;
