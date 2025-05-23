import React, { useState, useEffect } from 'react';
import { gql, useQuery ,useMutation} from '@apollo/client';
import '../css/chat.css';

const GET_CONVERSATIONS = gql`
  query GetConversations($userId: Int!) {
    conversations(userId: $userId) {
      user_id
      username
      messages {
        message
        senderId
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($senderId: Int!, $receiverId: Int!, $message: String!) {
    sendMessage(senderId: $senderId, receiverId: $receiverId, message: $message) {
      message
    }
  }
`;
const Chat = () => {
let id = localStorage.getItem('UserID') || sessionStorage.getItem('UserID') || null;

const currentUserId = id ? parseInt(id, 10) : null;
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  const { loading, error, data } = useQuery(GET_CONVERSATIONS, {
    variables: { userId: currentUserId },
  });

  useEffect(() => {
    if (data && data.conversations) {
      setConversations(data.conversations);
      if (data.conversations.length > 0) {
        handleSelectUser(data.conversations[0]);
      }
    }
  }, [data]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages(user.messages);
  };

  const send = async() => {
    if (messageInput.trim() === '') return;
    try{
    await sendMessageMutation({
      variables: {
        senderId: currentUserId,
        receiverId: selectedUser.user_id,
        message: messageInput,
      }
    });
    setMessages([...messages, { message: messageInput, senderId: currentUserId }]);
    setMessageInput('');
    }catch(error){
      console.log(`error in sending message!, ${error}`);
      
    }

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading conversations</p>;

  return (
    <div className="chat">
      <div className="students">
        <h3>List of users</h3>
        {conversations.map((user, index) => (
          <button
            key={index}
            onClick={() => handleSelectUser(user)}
            className={`container ${selectedUser?.user_id === user.user_id ? 'selected' : ''}`}
          >
            {user.username}
          </button>
        ))}
      </div>

      <div className="chatbox">
        {selectedUser ? (
          <div className="chatting">
            <p>Chatting with {selectedUser.username}</p>
            <div className="input">
              <div className="messages">
               {messages.map((msg, index) => (
              <div key={index} className={`message-box ${msg.senderId === currentUserId ? 'sent' : 'received'}`}>
                {msg.message}
              </div>
            ))}

              </div>
              <div className="send-line">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={send}>
                  <label>Send</label>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="placeholder">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
