import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../css/home.css';
import '../css/chat.css';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';


const DASHBOARD_STATS = gql`
  query DashboardStats($userId: Int!) {
    dashboardStats(userId: $userId) {
      total_tasks
      total_projects
      completed_projects
      total_students_in_projects
    }
  }
`;

const Home = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  let id = localStorage.getItem('UserID') || sessionStorage.getItem('UserID') || null;
  const user_id = id ? parseInt(id, 10) : null;

  const [dashboardData, setDashboardData] = useState({
    total_projects: 0,
    total_students_in_projects: 0,
    total_tasks: 0,
    completed_projects: 0,
  });
  
  const { loading, error, data } = useQuery(DASHBOARD_STATS, {
    variables: { userId: user_id },
  });
  useEffect(() => {

    if (data && data.dashboardStats) {
      setDashboardData(data.dashboardStats);}
  }, [data]);

  useEffect(() => {
    const ctx = chartRef.current;
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Projects', 'Students', 'Tasks', 'Finished Projects'],
        datasets: [{
          label: 'Count',
          data: [
            dashboardData.total_projects, 
            dashboardData.total_students_in_projects,
             dashboardData.total_tasks, dashboardData.completed_projects],
          borderWidth: 2,
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.1)',
            'rgba(54, 162, 235, 0.1)',
            'rgba(255, 206, 86, 0.1)',
            'rgba(153, 102, 255, 0.1)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Admin Dashboard Overview',
            font: {
              size: 14
            },
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [dashboardData]);

  return (
    <div className="home-main-column">
      <div className="home-fist-row">
      <p style={{
          fontSize: "1.5rem",
          color: "rgb(48, 99, 226)",
          fontWeight: "bold"
        }}>
        {new Date().toLocaleString('en-US', {
          weekday: 'long', 
          year: 'numeric',
          month: 'long',  
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })}
</p>

      </div>
    
      <div className="home-second-row">
        <div className="box">Number of Projects<br />{dashboardData.total_projects}</div>
        <div className="box">Number of Students<br />{ dashboardData.total_students_in_projects}</div>
        <div className="box">Number of Tasks<br />{dashboardData.total_tasks}</div>
        <div className="box">Number of Finished Projects<br />{dashboardData.completed_projects}</div>
      </div>

      <div className="home-third-row">
        <div className="chart">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;
