const connection = require('../database');

class chatModel {

    static async getMessagedUsers(userId) {
        try {
            const sql = `
                SELECT DISTINCT u.user_id, u.username, u.role
                FROM chat c
                JOIN users u ON (
                    u.user_id = c.receiver_id AND c.sender_id = ?
                    OR u.user_id = c.sender_id AND c.receiver_id = ?
                )
                WHERE u.user_id != ?;

            `;
            const [result] = await connection.query(sql,[userId, userId, userId]);
            return result;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Internal server error");
        }
    }
    
    static async getMessagesBetweenUsers(senderId, receiverTd){
        try{

            const sql = `
            SELECT message, sender_id
            FROM chat
            WHERE (sender_id = ? AND receiver_id = ?)
            OR (sender_id = ? AND receiver_id = ?)
            ORDER BY createdat ASC;
            `
            const [result] = await connection.query(sql,[senderId,receiverTd,receiverTd, senderId])
            return result;

        }catch(error){
            console.error("Error fetching messages:", error);
            throw new Error("Internal server error");
        }
    }
    
    static async saveMessage(senderId, receiverTd, message) {
        try {
        const sql = `
            INSERT INTO chat (sender_id, receiver_id, message, createdat)
            VALUES (?, ?, ?, NOW())
        `;
        const [result] = await connection.query(sql, [senderId, receiverTd, message]);
        return { message };  
        } catch (error) {
        console.error("Error saving message:", error);
        throw new Error("Internal server error");
        }
    }    
        
}

module.exports = chatModel;
