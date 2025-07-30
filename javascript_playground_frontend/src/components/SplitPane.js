import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./SplitPane.css";

// PUBLIC_INTERFACE
function SplitPane({ left, right }) {
  /**
   * Renders a horizontally resizable split pane
   * Props:
   *  - left: React node for left pane
   *  - right: React node for right pane
   */
  const MIN_WIDTH = 200;
  const [leftWidth, setLeftWidth] = useState(420);
  const dragging = useRef(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const newLeftWidth = Math.max(MIN_WIDTH, e.clientX - 12);
    setLeftWidth(newLeftWidth);
  };
  const onMouseUp = () => {
    dragging.current = false;
    document.body.style.cursor = "";
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="jp-splitpane">
      <div className="jp-pane jp-left" style={{ width: leftWidth }}>
        {left}
      </div>
      <div className="jp-divider" onMouseDown={onMouseDown} />
      <div className="jp-pane jp-right">
        {right}
      </div>
    </div>
  );
}
SplitPane.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
};
export default SplitPane;
