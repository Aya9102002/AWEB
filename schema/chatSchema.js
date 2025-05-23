//const { buildSchema } = require('graphql');
const {gql} = require('apollo-server')
const typeDefs  = gql`

  type Message {
    message: String
    senderId: Int
  }

  type UserWithMessages {
    user_id: Int
    username: String
    messages: [Message]
  }

  type Query {
    conversations(userId: Int!): [UserWithMessages]
  }

  type Mutation {
  sendMessage(senderId: Int!, receiverId: Int!, message: String!): Message
  }

`

module.exports = typeDefs;

