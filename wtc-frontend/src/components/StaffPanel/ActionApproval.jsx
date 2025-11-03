import React from "react";

function ActionApproval({ action, onApprove, onVeto }) {
  return (
    <div style={{ padding: "20px", border: "1px solid black", marginBottom: "10px" }}>
      <h3>{action.name}</h3>
      <button onClick={() => onApprove(action.id)}>Approve</button>
      <button onClick={() => onVeto(action.id)}>Veto</button>
    </div>
  );
}

export default ActionApproval;
