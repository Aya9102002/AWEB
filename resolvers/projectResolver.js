const ProjectModel = require('../models/projectModel');

const resolvers = {
  Query: {
    getProjectsByUser: async (parent, { userId, role }) => {
      try {
        const projects = await ProjectModel.getProjectsByUser(userId, role);
        return {
          data: projects,
          success: true,
          message: "Projects fetched successfully",
        };
      } catch (error) {
        console.error("Error in getProjectsByUser resolver:", error);
        return {
          data: [],
          success: false,
          message: "Failed to fetch projects",
        };
      }
    }
  }
};

module.exports = resolvers;
