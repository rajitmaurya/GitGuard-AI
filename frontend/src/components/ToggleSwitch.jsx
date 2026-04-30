import React from 'react';

const ToggleSwitch = ({ label, isChecked, onChange }) => {
  return (
    <div className="toggle-switch-container">
      <span className="toggle-label">{label}</span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
