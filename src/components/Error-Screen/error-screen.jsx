import React from "react";

function ErrorScreen({ error }) {
  return (
    <div className="error-screen">
      <h4>404</h4>
      <p>{error || "This page could not be found."}</p>
    </div>
  );
}

export default ErrorScreen;
