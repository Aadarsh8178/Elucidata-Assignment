import React from "react";

function spinner(props) {
  return (
    <div
      className="d-flex align-items-center justify-content-center position-fixed"
      style={{
        zIndex: "1000",
        minHeight: "100vh",
        minWidth: "100vw",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default spinner;
