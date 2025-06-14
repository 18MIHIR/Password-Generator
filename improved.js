import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [numberChecked, setNumberCheck] = useState(false);
  const [charChecked, setCharCheck] = useState(false);
  const [copied, setCopied] = useState(false);

  function generatePassword() {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberChecked) {
      str += "0123456789";
    }
    if (charChecked) {
      str += "~!@$%#^&*(()_[]}{';:/?>,.<";
    }
    
    let pass = "";
    const strLength = str.length;
    const crypto = window.crypto || window.msCrypto; // For better randomness
    const buffer = new Uint32Array(length);
    
    if (crypto) {
      crypto.getRandomValues(buffer);
      for (let i = 0; i < length; i++) {
        pass += str[buffer[i] % strLength];
      }
    } else {
      // Fallback if crypto API not available
      for (let i = 0; i < length; i++) {
        pass += str[Math.floor(Math.random() * strLength)];
      }
    }

    setPassword(pass);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberChecked, charChecked]);

  return (
    <div className="password-generator">
      <h1>Password Generator</h1>
      
      <div className="password-display">
        <div className="password">{password || "Generating..."}</div>
        <button 
          onClick={copyToClipboard} 
          disabled={!password}
          className="copy-btn"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      
      <div className="controls">
        <div className="control-group">
          <label>
            Length: {length}
            <input
              type="range"
              min={5}
              max={25}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </label>
        </div>
        
        <div className="control-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={numberChecked}
              onChange={() => setNumberCheck(!numberChecked)}
            />
            <span className="checkmark"></span>
            Include Numbers
          </label>
        </div>
        
        <div className="control-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={charChecked}
              onChange={() => setCharCheck(!charChecked)}
            />
            <span className="checkmark"></span>
            Include Special Characters
          </label>
        </div>
      </div>
      
      <button onClick={generatePassword} className="generate-btn">
        Generate New Password
      </button>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<PasswordGenerator />);