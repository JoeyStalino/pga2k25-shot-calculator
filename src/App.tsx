import { useState, useEffect } from "react";
import "./App.css";
import AdComponent from "./AdComponent"; // Import the AdComponent

function App() {
  const [targetDistance, setTargetDistance] = useState("");
  const [liePercentage, setLiePercentage] = useState("");
  const [elevation, setElevation] = useState("");
  const [isUphill, setIsUphill] = useState(true); // Toggle for uphill/downhill
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState(0); // Default to 0° (north)
  const [result, setResult] = useState("");

  const calculateShot = () => {
    const target = parseFloat(targetDistance);
    const lie = parseFloat(liePercentage) / 100;
    const elev = parseFloat(elevation) * (isUphill ? 1 : -1); // Apply uphill/downhill toggle
    const wind = parseFloat(windSpeed);

    if (isNaN(target) || isNaN(lie) || isNaN(elev) || isNaN(wind)) {
      setResult("Please fill in all fields.");
      return;
    }

    const adjustedDistance = target * (1 - lie) + target;
    const elevationAdjustment = elev / 3;
    const windAngleRadians = (windDirection * Math.PI) / 180;
    const windEffect = wind * Math.cos(windAngleRadians);
    const finalDistance = adjustedDistance + elevationAdjustment + windEffect;

    setResult(`Adjusted Distance: ${Math.round(finalDistance)} yards`);
  };

  useEffect(() => {
    calculateShot();
  }, [targetDistance, liePercentage, elevation, isUphill, windSpeed, windDirection]);

  return (
    <div className="app-container">
      {/* Logo Section */}
      <div className="logo">
        <h1>PGA 2K25</h1>
        <p>Smart Caddie</p>
      </div>

      <div>
        <label>Target Distance (yards):</label>
        <input
          type="number"
          value={targetDistance}
          onChange={(e) => setTargetDistance(e.target.value)}
          placeholder="Enter distance"
        />

        <label>Lie Percentage (%):</label>
        <input
          type="number"
          value={liePercentage}
          onChange={(e) => setLiePercentage(e.target.value)}
          placeholder="Enter lie percentage"
        />

        <label>Elevation (feet):</label>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="number"
            value={elevation}
            onChange={(e) => setElevation(e.target.value)}
            placeholder="Enter elevation"
          />
          <button
            onClick={() => setIsUphill(!isUphill)}
            style={{
              padding: "5px 10px",
              backgroundColor: isUphill ? "#007bff" : "#ff4d4d",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {isUphill ? "Uphill" : "Downhill"}
          </button>
        </div>

        <label>Wind Speed (mph):</label>
        <input
          type="number"
          value={windSpeed}
          onChange={(e) => setWindSpeed(e.target.value)}
          placeholder="Enter wind speed"
        />
      </div>

      <div>
        <div className="wind-visual">
          <div
            className="wind-arrow"
            style={{ transform: `rotate(${windDirection}deg)` }}
          ></div>
          <div className="compass-labels north">N</div>
          <div className="compass-labels east">E</div>
          <div className="compass-labels south">S</div>
          <div className="compass-labels west">W</div>
        </div>

        <label>Wind Direction (degrees):</label>
        <input
          type="range"
          min="0"
          max="360"
          value={windDirection}
          onChange={(e) => setWindDirection(parseInt(e.target.value))}
        />
        <div>Wind Direction: {windDirection}°</div>
      </div>

      {/* Ad Component */}
      <AdComponent />

      <div className="result">{result}</div>
    </div>
  );
}

export default App;