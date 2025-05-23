import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/main_page.css';

const Sidebar = () => {
  const role = localStorage.getItem('UserRole') || sessionStorage.getItem('UserRole');

  return (
    <div className="sidebar">
      <div className="btns-container">

        {role !== 'student' && (
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "sidebar-btn active" : "sidebar-btn"
            }
          >
            Home
          </NavLink>
        )}

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "sidebar-btn active" : "sidebar-btn"
          }
        >
          Projects
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "sidebar-btn active" : "sidebar-btn"
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "sidebar-btn active" : "sidebar-btn"
          }
        >
          Chat
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
