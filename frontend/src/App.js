import React from 'react';
import UnitConverter from './components/UnitConverter'; // Adjust the path as necessary
import './App.css'; // Import your global styles if needed

const App = () => {
  return (
    <div className="App">
      <h1 className="app-title">Unit Converter App</h1>
      <UnitConverter />
    </div>
  );
};

export default App;
