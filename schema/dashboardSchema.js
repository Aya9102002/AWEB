const { gql } = require('apollo-server');

const typeDefs = gql`
  type DashboardStats {
    total_tasks: Int
    total_projects: Int
    completed_projects: Int
    total_students_in_projects: Int
  }

  type Query {
    dashboardStats(userId: Int!): DashboardStats
  }
`;

module.exports = typeDefs;
