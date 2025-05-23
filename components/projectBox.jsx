const ProjectBox = ({ title, description, students, category, progress, startDate, endDate }) => {
  const categories = [
  'Web Development',
  'Mobile Development',
  'AI & Machine Learning',
  'Data Analysis'
];
const formatDate = (timestamp) => {
  if (!timestamp) return 'Invalid Date';
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString(); 
};

  return (
    <div className="project-box">
      <h3>{title || 'Project'}</h3>
      <p><strong>Description:</strong> {description || ''}</p>
      <p>
        <strong>Students:</strong>{' '}
        {Array.isArray(students) ? students.join(', ') : ''}
      </p>
      <p><strong>Category:</strong> {categories[category-1] || ''}</p>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress || 0}%` }}>
          
          <span className="progress-text">{progress || 0}%</span>
        </div>
      </div>

      <div className="project-page-date">
        <p>{formatDate(startDate) || 'Start Date '}</p>
        <p>{formatDate(endDate) || 'End Date '}</p>
      </div>
    </div>
  );
};

export default ProjectBox;
