const chatModel = require('../models/chatModel');

const resolvers = {
  Query: {
    conversations: async (parent, { userId }) => {
      try {
        const users = await chatModel.getMessagedUsers(userId);
        const result = [];

        for (const user of users) {
          const messages = await chatModel.getMessagesBetweenUsers(userId, user.user_id);
          result.push({
            user_id: user.user_id,
            username: user.username,
            messages: messages.map(m => ({
              message: m.message,
              senderId: m.sender_id,
            }))
          });
        }

        return result;
      } catch (error) {
        console.error("Error in resolver:", error);
        throw new Error("Failed to fetch conversations");
      }
    }
  
  },

  Mutation: {
      sendMessage: async(__,{senderId, receiverId, message})=>{
              try {
        const savedMessage = await chatModel.saveMessage(senderId, receiverId, message);
        return savedMessage;
      } catch (error) {
        console.error('Failed to send message:', error);
        throw new Error('Failed to send message');
      }
    }
      }

  }




module.exports = resolvers;
