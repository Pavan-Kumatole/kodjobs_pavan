import React from 'react';

const JobCard = ({ job }) => {
  const handleApply = () => {
    // You can add application logic here
    alert(`Applied for ${job.role} position at ${job.companyName}`);
  };

  return (
    <div className="job-card">
      <div className="company-logo">
        <img src={job.companyLogo || '/default-company-logo.png'} alt={job.companyName} />
      </div>
      <div className="job-info">
        <div className="job-header">
          <h3>{job.companyName}</h3>
          <span className="lpa">{job.salary} LPA</span>
        </div>
        <div className="location">
          <i className="fas fa-map-marker-alt"></i>
          {job.location}
        </div>
        <h4>{job.role}</h4>
        <div className="skills">
          {job.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
        <div className="job-meta">
          <span>Posted {job.postedDate}</span>
          {/* <span className="not-applied">Not Applied</span> */}
        </div>
        <button className="apply-btn" onClick={handleApply}>Apply Now</button>
      </div>
    </div>
  );
};

export default JobCard;