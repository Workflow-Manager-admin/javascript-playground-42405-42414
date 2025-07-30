import React from "react";
import PropTypes from "prop-types";
import "./OutputPane.css";

// PUBLIC_INTERFACE
function OutputPane({ output, error }) {
  /**
   * OutputPane displays the result and error messages from JS code execution.
   * Props:
   *  - output: string (stdout)
   *  - error: string (stderr)
   */
  return (
    <div className="output-pane">
      <div className="output-label">Output</div>
      <pre className="output-content">{output}</pre>
      {error && (
        <div className="output-error">
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

OutputPane.propTypes = {
  output: PropTypes.string,
  error: PropTypes.string,
};

OutputPane.defaultProps = {
  output: "",
  error: "",
};

export default OutputPane;
