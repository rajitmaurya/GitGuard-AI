import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getReviewById } from '../services/api';
import ReviewDetails from '../components/ReviewDetails';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      setLoading(true);
      const data = await getReviewById(id);
      
      if (!data) {
        // If no review found, redirect back to dashboard
        navigate('/');
        return;
      }
      
      setReview(data);
      setLoading(false);
    };

    fetchReviewDetails();
  }, [id, navigate]);

  return (
    <div className="details-page-container">
      <div className="back-nav">
        <Link to="/" className="back-link">
          &larr; Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading review details...</div>
      ) : (
        <ReviewDetails review={review} />
      )}
    </div>
  );
};

export default Details;
