import React from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review }) => {
  // Format date for better readability
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  // Determine severity color
  let severityColor = '';
  switch (review.severity.toLowerCase()) {
    case 'high':
      severityColor = 'severity-high';
      break;
    case 'medium':
      severityColor = 'severity-medium';
      break;
    case 'low':
      severityColor = 'severity-low';
      break;
    default:
      severityColor = 'severity-low';
  }

  return (
    <div className="review-card">
      <div className="review-card-header">
        <h3>{review.repoName}</h3>
        <span className={`severity-badge ${severityColor}`}>
          {review.severity}
        </span>
      </div>
      
      <div className="review-card-body">
        <p><strong>PR Number:</strong> #{review.prNumber}</p>
        <p><strong>Created:</strong> {formattedDate}</p>
        <p><strong>Type:</strong> {review.issueType}</p>
      </div>

      <div className="review-card-footer">
        <Link to={`/details/${review.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
