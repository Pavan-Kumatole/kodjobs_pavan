import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import JobCard from './JobCard';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    minSalary: '',
    skills: []
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://kodjobs-pavan.onrender.com/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = job.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
                          job.role.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLocation = !filters.location || job.location.includes(filters.location);
      const matchesSalary = !filters.minSalary || job.salary >= parseFloat(filters.minSalary);
      const matchesSkills = filters.skills.length === 0 || 
                          filters.skills.every(skill => job.skills.includes(skill));

      return matchesSearch && matchesLocation && matchesSalary && matchesSkills;
    });

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  return (
    <div className="dashboard">
      <div className="filters">
        <input
          type="text"
          placeholder="Search companies or roles..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
        />
        <input
          type="number"
          placeholder="Min Salary (LPA)"
          value={filters.minSalary}
          onChange={(e) => setFilters({...filters, minSalary: e.target.value})}
        />
      </div>

      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;