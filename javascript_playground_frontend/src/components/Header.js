import React from "react";
import ShareButton from "./ShareButton";
import "./Header.css";

// PUBLIC_INTERFACE
function Header({ code }) {
  /**
   * Header for the playground.
   * Displays the app title and the ShareButton.
   */
  return (
    <header className="jp-header">
      <div className="jp-title">
        <span role="img" aria-label="JS" className="jp-logo">🟨</span>
        JavaScript Playground
      </div>
      <ShareButton code={code} />
    </header>
  );
}

export default Header;
