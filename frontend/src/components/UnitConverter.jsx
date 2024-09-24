import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../styles/UnitConverter.css'; // Import CSS styles

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [unitType, setUnitType] = useState('Distance');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // New state to toggle history display

  // Conversion logic
  const convert = () => {
    let value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    let conversionFactor = 1;

    switch (unitType) {
      case 'Distance':
        if (fromUnit === 'meters' && toUnit === 'kilometers') {
          conversionFactor = 0.001;
        } else if (fromUnit === 'kilometers' && toUnit === 'meters') {
          conversionFactor = 1000;
        }
        break;

      case 'Temperature':
        if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
          setResult((value * 9) / 5 + 32);
          return; // Return early
        } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
          setResult((value - 32) * (5 / 9));
          return; // Return early
        }
        break;

      case 'Volume':
        if (fromUnit === 'liters' && toUnit === 'milliliters') {
          conversionFactor = 1000;
        } else if (fromUnit === 'milliliters' && toUnit === 'liters') {
          conversionFactor = 0.001;
        }
        break;

      case 'Time':
        if (fromUnit === 'hours' && toUnit === 'minutes') {
          conversionFactor = 60;
        } else if (fromUnit === 'minutes' && toUnit === 'hours') {
          conversionFactor = 1 / 60;
        }
        break;

      case 'Weight':
        if (fromUnit === 'kilograms' && toUnit === 'grams') {
          conversionFactor = 1000;
        } else if (fromUnit === 'grams' && toUnit === 'kilograms') {
          conversionFactor = 0.001;
        }
        break;

      default:
        setResult('Conversion not supported');
        return;
    }

    setResult(value * conversionFactor);
  };

  // Handle saving conversion history
  const handleSave = async () => {
    const newConversion = {
      inputValue,
      fromUnit,
      toUnit,
      result,
    };
    await axios.post('http://localhost:5000/api/conversions', newConversion);
    fetchHistory();
  };

  // Fetch conversion history from server
  const fetchHistory = async () => {
    const res = await axios.get('http://localhost:5000/api/conversions');
    setHistory(res.data);
  };

  // Handle deleting a history item
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/conversions/${id}`);
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Handle number button clicks
  const handleNumberClick = (number) => {
    setInputValue((prev) => prev + number);
  };

  // Handle backspace button click
  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  // Toggle history display
  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <div className="converter-container">
      <nav className="navbar">
        <h1 className="navbar-heading">Unit Converter</h1>
      </nav>
      <div className="unit-selection">
        <label>Select Unit Type:</label>
        <select
          className="unit-type-select"
          onChange={(e) => setUnitType(e.target.value)}
        >
          <option value="Distance">Distance</option>
          <option value="Temperature">Temperature</option>
          <option value="Volume">Volume</option>
          <option value="Time">Time</option>
          <option value="Weight">Weight</option>
        </select>
      </div>

      {/* Conversion Logic */}
      {/* From and To Unit Selection */}
      <div className="conversion-section">
        <label>From:</label>
        <select className="unit-select" onChange={(e) => setFromUnit(e.target.value)}>
          {unitType === 'Distance' && (
            <>
              <option value="meters">Meters</option>
              <option value="kilometers">Kilometers</option>
            </>
          )}
          {unitType === 'Temperature' && (
            <>
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </>
          )}
          {unitType === 'Volume' && (
            <>
              <option value="liters">Liters</option>
              <option value="milliliters">Milliliters</option>
            </>
          )}
          {unitType === 'Time' && (
            <>
              <option value="hours">Hours</option>
              <option value="minutes">Minutes</option>
            </>
          )}
          {unitType === 'Weight' && (
            <>
              <option value="kilograms">Kilograms</option>
              <option value="grams">Grams</option>
            </>
          )}
        </select>

        <label>To:</label>
        <select className="unit-select" onChange={(e) => setToUnit(e.target.value)}>
          {unitType === 'Distance' && (
            <>
              <option value="meters">Meters</option>
              <option value="kilometers">Kilometers</option>
            </>
          )}
          {unitType === 'Temperature' && (
            <>
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </>
          )}
          {unitType === 'Volume' && (
            <>
              <option value="liters">Liters</option>
              <option value="milliliters">Milliliters</option>
            </>
          )}
          {unitType === 'Time' && (
            <>
              <option value="hours">Hours</option>
              <option value="minutes">Minutes</option>
            </>
          )}
          {unitType === 'Weight' && (
            <>
              <option value="kilograms">Kilograms</option>
              <option value="grams">Grams</option>
            </>
          )}
        </select>
      </div>

      <div className="input-section">
        <div className="input-display">{inputValue || 'Enter a value'}</div>
        <div className="number-buttons-grid">
          <button className="action-btn" onClick={toggleHistory}>
            History
          </button>
          <button className="clear-btn" onClick={() => setInputValue('')}>Clear</button>
          <button className="backspace-btn" onClick={handleBackspace}>←</button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} className="number-btn" onClick={() => handleNumberClick(num)}>
              {num}
            </button>
          ))}
          <button className="number-btn" onClick={() => handleNumberClick(0)}>0</button>
          <button className="symbol-btn" onClick={() => handleNumberClick('.')}>.</button>

          <button className="convert-btn" onClick={convert}>Convert</button>
        </div>
      </div>

      {result !== null && (
        <div className="result-display">
          <div>Result: {result}</div>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      )}

      {/* Show History if toggled */}
      {showHistory && (
        <div className="history-section">
          <h2>History</h2>
          {history.length === 0 ? (
            <p>No history found.</p>
          ) : (
            history.map((conversion) => (
              <div key={conversion._id} className="history-item">
                <p>{`${conversion.inputValue} ${conversion.fromUnit} → ${conversion.toUnit} = ${conversion.result}`}</p>
                <button className="delete-btn" onClick={() => handleDelete(conversion._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
