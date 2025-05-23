const { gql } = require('apollo-server');

const typeDefs = gql`

type AuthPayload {
  message: String
  success: Boolean
  token: String
  user: User
}

type User {
  user_id: Int
  username: String
  role: String
}


  type MessagePayload {
    message: String
    success: Boolean
  }

  type UserIdPayload {
    data: [UserId]
    success: Boolean
    message: String
  }

  type UserId {
    user_id: Int
  }

  type Query {
    getUserByToken(token: String!): UserIdPayload
    getUserID(username: String!): UserIdPayload
  }

type Mutation {
  register(username: String!, password: String!, role: String!, studentId: Int): MessagePayload
  logIn(username: String!, password: String!): AuthPayload
}


`;

module.exports = typeDefs;
