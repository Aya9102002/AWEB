const UserModel = require('../models/userModel');

const resolvers = {
  Query: {
    getUserByToken: async (parent, { token }) => {
      try {
        const result = await UserModel.getUserByToken(token);
        return result;
      } catch (error) {
        console.error(error);
        return { message: 'Failed to fetch user by token', success: false };
      }
    },
    getUserID: async ( parent, { username }) => {
      try {
        const result = await UserModel.getUserID(username);
        return result;
      } catch (error) {
        console.error(error);
        return { message: 'Failed to fetch user ID', success: false };
      }
    }
  },

  Mutation: {
register: async (parent, { username, password, role, studentId }) => {
  try {
    const result = await UserModel.Register(username, password, role, studentId);
    return result;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to register user', success: false };
  }
},
logIn: async (parent, { username, password }) => {
  try {
    const result = await UserModel.LogIn(username, password);
    return result;
  } catch (error) {
    console.error("login error:", error);
    return null;
  }
}



  }
};

module.exports = resolvers;
