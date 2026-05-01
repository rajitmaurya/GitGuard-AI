import React, { useState, useEffect } from 'react';
import { getReviews } from '../services/api';
import ReviewCard from '../components/ReviewCard';
import FilterBar from '../components/FilterBar';
import ToggleSwitch from '../components/ToggleSwitch';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');
  
  // Settings state
  const [isStrictMode, setIsStrictMode] = useState(false);
  const [ignoreLint, setIgnoreLint] = useState(false);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
      setFilteredReviews(data);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  // Apply filters when reviews, searchTerm, or filterSeverity change
  useEffect(() => {
    let result = reviews;

    // Apply severity filter
    if (filterSeverity !== 'All') {
      result = result.filter(review => 
        review.severity.toLowerCase() === filterSeverity.toLowerCase()
      );
    }

    // Apply search term filter
    if (searchTerm.trim() !== '') {
      result = result.filter(review => 
        review.repoName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReviews(result);
  }, [reviews, searchTerm, filterSeverity]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-top">
          <div className="user-info">
            <span className="user-greeting">Hello, <strong>{user?.username}</strong></span>
          </div>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
        <h1>GitGuard AI Dashboard</h1>
        <p className="subtitle">AI-generated code reviews for your Pull Requests</p>
      </header>

      <section className="controls-section">
        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterSeverity={filterSeverity}
          onFilterChange={setFilterSeverity}
        />
        
        <div className="toggles-container">
          <ToggleSwitch 
            label="Strict Mode" 
            isChecked={isStrictMode} 
            onChange={setIsStrictMode} 
          />
          <ToggleSwitch 
            label="Ignore Lint Issues" 
            isChecked={ignoreLint} 
            onChange={setIgnoreLint} 
          />
        </div>
      </section>

      <section className="reviews-section">
        <h2>Recent Reviews ({filteredReviews.length})</h2>
        
        {loading ? (
          <div className="loading">Loading reviews...</div>
        ) : filteredReviews.length > 0 ? (
          <div className="reviews-grid">
            {filteredReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No reviews found matching your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
