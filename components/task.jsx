import React, { useState } from 'react';
import '../css/task.css';

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const role = localStorage.getItem('UserRole') || sessionStorage.getItem('UserRole');

  return (
    <div className="tasks">
      <div className="top-bar">
        <div className="sort-box">
          <label>Sort By:</label>
          <select>
            <option>Task Status</option>
            <option>Project</option>
            <option>Due Date</option>
            <option>Assigned Students</option>
          </select>
        </div>

        {role !== 'student' && (
          <button className="create-btn" onClick={() => setOpenModal(true)}>
            Create New Task
          </button>
        )}
      </div>


      {role !== 'student' && (
        <div className={`modal ${openModal ? 'show' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Task</h2>
              <span className="close-btn" onClick={() => setOpenModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>Project Title:</label>
                <select>
                  <option disabled>Select a project</option>
                  <option>Website Redesign</option>
                  <option>Mobile App</option>
                </select>
              </div>

              <div className="input-group">
                <label>Task Name:</label>
                <input type="text" />
              </div>

              <div className="input-group">
                <label>Description:</label>
                <textarea></textarea>
              </div>

              <div className="input-group">
                <label>Assigned Students:</label>
                <select>
                  <option disabled>Select a student</option>
                  <option>Ali</option>
                  <option>Yaseen</option>
                </select>
              </div>

              <div className="input-group">
                <label>Status</label>
                <select>
                  <option disabled>Select a status</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>On Hold</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div className="input-group">
                <label>Due Date:</label>
                <input type="date" />
              </div>

              <button className="submit-btn">Add Task</button>
            </div>
          </div>
        </div>
      )}

      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Assigned</th>
            <th>Status</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Website Redesign</td>
            <td>Homepage Design</td>
            <td>Create responsive UI</td>
            <td>Ali</td>
            <td>In Progress</td>
            <td>2025-05-20</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
