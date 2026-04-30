import React from 'react';

const ReviewDetails = ({ review }) => {
  if (!review) return <div>Loading...</div>;

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
    <div className="review-details">
      <div className="details-header">
        <h2>{review.repoName} (PR #{review.prNumber})</h2>
        <span className={`severity-badge ${severityColor}`}>
          {review.severity} Severity
        </span>
      </div>

      <div className="details-section">
        <h3>Issue Type</h3>
        <p>{review.issueType}</p>
      </div>

      <div className="details-section">
        <h3>Description</h3>
        <p>{review.description}</p>
      </div>

      <div className="details-section code-section">
        <h3>Suggested Fix</h3>
        <pre>
          <code>{review.fixCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default ReviewDetails;
