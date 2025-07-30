import React, { useState, useCallback, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputPane from "./components/OutputPane";
import SplitPane from "./components/SplitPane";
import Header from "./components/Header";
import "./Playground.css";

/**
 * Playground is the main app logic for the JavaScript code playground.
 * Handles:
 *   - syncing code to output (live evaluation)
 *   - layout and communication between editor and output
 */
const DEFAULT_CODE = `// Welcome to JavaScript Playground!
// Type your JS code and see the result instantly

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Kavia"));
`;

function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // On mount: check for a code fragment
  useEffect(() => {
    const frag = window.location.hash;
    if (frag.startsWith("#code=")) {
      try {
        const encoded = frag.slice(6);
        const decoded = decodeURIComponent(atob(encoded));
        setCode(decoded);
      } catch {
        // ignore invalid fragment
      }
    }
  }, []);

  // Handler: evaluate code and capture output/errors (sandboxed in function)
  const evaluateCode = useCallback(
    (source) => {
      let out = '';
      let err = '';
      // Safe output collection
      const captureLog = (...args) => {
        out += args.map(String).join(" ") + '\n';
      };
      try {
        // eslint-disable-next-line no-new-func
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const runner = new AsyncFunction("console", `"use strict";\n${source}`);
        runner({ log: captureLog });
      } catch (e) {
        err = e.message;
      }
      setOutput(out);
      setError(err);
    },
    [setOutput, setError]
  );

  // Evaluate on code change (debounced for perf)
  useEffect(() => {
    const t = setTimeout(() => {
      evaluateCode(code);
    }, 200);
    return () => clearTimeout(t);
  }, [code, evaluateCode]);

  return (
    <div className="jp-root">
      <Header code={code} />
      <SplitPane
        left={
          <div className="jp-editor-pane">
            <CodeEditor code={code} onChange={setCode} />
          </div>
        }
        right={
          <div className="jp-output-pane">
            <OutputPane output={output} error={error} />
          </div>
        }
      />
    </div>
  );
}
export default Playground;
