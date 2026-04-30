import React from 'react';

const FilterBar = ({ searchTerm, onSearchChange, filterSeverity, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <div className="search-group">
        <label htmlFor="searchRepo">Search Repository:</label>
        <input
          id="searchRepo"
          type="text"
          placeholder="e.g. facebook/react"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="severityFilter">Filter by Severity:</label>
        <select
          id="severityFilter"
          value={filterSeverity}
          onChange={(e) => onFilterChange(e.target.value)}
          className="severity-select"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
