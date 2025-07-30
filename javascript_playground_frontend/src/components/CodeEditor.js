import React from "react";
import PropTypes from "prop-types";
import "./CodeEditor.css";

// PUBLIC_INTERFACE
function CodeEditor({ code, onChange }) {
  /**
   * This is a code editor component with syntax highlighting for JavaScript.
   * Uses a simple contenteditable div for lightweight approach.
   * Props:
   *  - code: string (current code)
   *  - onChange: function (called with new code)
   */
  const handleInput = (e) => {
    onChange(e.target.innerText);
  };

  return (
    <div className="editor-container">
      <div
        className="code-editor"
        contentEditable={true}
        spellCheck={false}
        onInput={handleInput}
        aria-label="JavaScript code editor"
        data-gramm="false"
        tabIndex={0}
        suppressContentEditableWarning={true}
      >
        {code}
      </div>
    </div>
  );
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CodeEditor;
