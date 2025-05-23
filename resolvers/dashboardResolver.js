const TaskModel = require('../models/taskModel');
const ProjectModel = require('../models/projectModel');

const resolvers = {
  Query: {
    dashboardStats: async (parent, { userId }) => {
      try {
        const totalTasks = await TaskModel.getTotalTasks(userId);
        const totalProjects = await ProjectModel.getTotalProject(userId);
        const totalFinishedProjects = await ProjectModel.getTotalFinishedProject(userId);
        const totalStudentsInProjects = await ProjectModel.getStudentsINProjects(userId);

        return {
          total_tasks: totalTasks[0].total_tasks,
          total_projects: totalProjects[0].total_projects,
          completed_projects: totalFinishedProjects[0].completed_projects,
          total_students_in_projects: totalStudentsInProjects[0].total_students,
        };
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw new Error("Internal server error");
      }
    }
  }
};

module.exports = resolvers;
