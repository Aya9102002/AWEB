const { gql } = require('apollo-server');

const typeDefs = gql`
  type Project {
    project_id: Int
    description: String
    catid: Int
    name: String
    startdate: String
    enddate: String
    userid: Int
    percent: Int
    status: String
  }

  type ProjectPayload {
    data: [Project]
    success: Boolean
    message: String
  }

  type Query {
    getProjectsByUser(userId: Int!, role: String!): ProjectPayload
  }
`;

module.exports = typeDefs;
