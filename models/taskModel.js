const connection = require('../database');

class TaskModel {

    static async getTotalTasks(userId) {
        try {
            const sql = `
            SELECT COUNT(*) AS total_tasks
            FROM task t
            JOIN project p ON p.project_id = t.projectid
            WHERE p.userid = ?;

            `;
            const [result] = await connection.query(sql,[userId]);
            return result;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Internal server error");
        }
    }
    
    
    
    
}

module.exports = TaskModel;
