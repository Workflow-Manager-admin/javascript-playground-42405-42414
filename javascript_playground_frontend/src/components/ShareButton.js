import React from "react";
import PropTypes from "prop-types";
import "./ShareButton.css";

// PUBLIC_INTERFACE
function ShareButton({ code }) {
  /**
   * Generates and copies shareable link encoding the code in the URL fragment.
   */
  const handleShare = async () => {
    // For snippet sharing, we'll use URL hash (fragment) encoding
    const base = window.location.origin + window.location.pathname;
    const fragment = "#code=" + encodeURIComponent(btoa(unescape(encodeURIComponent(code))));
    const url = base + fragment;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
    alert("Share link copied to clipboard!");
  };

  return (
    <button className="jp-share-btn" onClick={handleShare} title="Share this code">
      Share
    </button>
  );
}

ShareButton.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ShareButton;
