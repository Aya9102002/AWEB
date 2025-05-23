import React, { useState, useEffect, useContext } from 'react';
import '../css/project.css';
import ProjectBox from './projectBox';
import { useQuery, gql } from '@apollo/client';
import { FlagContext } from '../context/flagContext';

const GET_PROJECTS = gql`
  query GetProjects($userId: Int!, $role: String!) {
    getProjectsByUser(userId: $userId, role: $role) {
      success
      message
      data {
        project_id
        description
        catid
        name
        startdate
        enddate
        userid
        percent
        status
      }
    }
  }
`;

const Projects = () => {
  const { user } = useContext(FlagContext);
  const role = user ? user.role : '';
  const user_id = user ? parseInt(user.user_id) : null;

  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const { data, refetch } = useQuery(GET_PROJECTS, {
    variables: { userId: user_id, role },
    skip: !user_id || !role,
  });

  useEffect(() => {
    if (data?.getProjectsByUser?.success) {
      setFilteredProjects(data.getProjectsByUser.data);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.getProjectsByUser?.success) return;

    let projects = data.getProjectsByUser.data;

    if (searchTerm) {
      projects = projects.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All Statuses') {
      projects = projects.filter(p => p.status === statusFilter);
    }

    setFilteredProjects(projects);
  }, [searchTerm, statusFilter, data]);

  useEffect(() => {
    if (user_id && role) {
      refetch({ userId: user_id, role });
    }
  }, [user_id, role, refetch]);

  return (
    <>
      <p style={{ fontSize: '1.5rem', color: 'rgb(48, 99, 226)', fontWeight: 'bold', padding: 0, margin: 0 }}>
        Project Overview
      </p>

      <div className="project-page-container">
        <div className="project-page-first-row">
          {role !== 'student' && (
            <button className="add-new-project-btn" onClick={() => setModal(true)}>
              Add New Project
            </button>
          )}

          <input
            type="text"
            id="textField"
            className="search-bar"
            placeholder="Search projects by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            id="dropdown"
            className="statuses-dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Statuses">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="project-page-second-row">
          {filteredProjects.map((project) => (
<ProjectBox
  key={project.project_id}
  title={project.name}
  description={project.description}
  students={[]} 
  category={project.catid}
  progress={project.percent}
  startDate={project.startdate}
  endDate={project.enddate}
/>
          ))}
        </div>
      </div>

      {role !== 'student' && (
        <div className={`modal ${modal ? 'show' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <span className="close-btn" onClick={() => setModal(false)}>&times;</span>
            </div>

            <div className="modal-body">
              <div className="input-group">
                <label>Project Title:</label>
                <input type="text" placeholder="Enter project title" />
              </div>

              <div className="input-group">
                <label>Project Description:</label>
                <textarea placeholder=""></textarea>
              </div>

              <div className="input-group">
                <label>Assigned Students:</label>
                <textarea placeholder=""></textarea>
              </div>

              <div className="input-group">
                <label>Project Category:</label>
                <select>
                  <option disabled>Select a category</option>
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>AI & Machine Learning</option>
                  <option>Data Analysis</option>
                </select>
              </div>

              <div className="input-group">
                <label>Starting Date:</label>
                <input type="date" />
              </div>

              <div className="input-group">
                <label>Ending Date:</label>
                <input type="date" />
              </div>

              <div className="input-group">
                <label>Project Status:</label>
                <select>
                  <option disabled>Select a status</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>On Hold</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <button className="submit-btn">Add Project</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
