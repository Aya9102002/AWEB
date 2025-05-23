const connection = require('../database');

class ProjectModel {

    static async getTotalProject(userId) {
        try {
            const sql = `
                SELECT COUNT(*) AS total_projects
                FROM project
                WHERE userid = ?;

            `;
            const [result] = await connection.query(sql,[userId]);
            return result;
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw new Error("Internal server error");
        }
    }

    static async getTotalFinishedProject(userId) {
        try {
            const sql = `
            SELECT COUNT(*) AS completed_projects
            FROM project
            WHERE userid = ? AND staus = 'Completed';
            `;
            const [result] = await connection.query(sql,[userId]);
            return result;
        } catch (error) {
            console.error("Error fetching finished projects:", error);
            throw new Error("Internal server error");
        }
    }
    


    static async getStudentsINProjects(userId) {
        try {
            const sql = `
            SELECT COUNT(DISTINCT s.student_id) AS total_students
            FROM student s
            JOIN prostu ps ON ps.stuid = s.student_id
            JOIN project p ON p.project_id = ps.proid
            WHERE p.userid = ?;

                        `;
            const [result] = await connection.query(sql,[userId]);
            return result;
        } catch (error) {
            console.error("Error fetching  students:", error);
            throw new Error("Internal server error");
        }
    }


  static async getProjectsByUser(userId, role) {
    try {
      let sql;
      let params = [userId];

      if (role === 'student') {
        console.log('stu');
        

        sql = `
          SELECT p.project_id, p.description, p.catid, p.name, p.startdate, p.enddate, p.userid, p.percent, p.staus
          FROM project p
          JOIN prostu ps ON p.project_id = ps.proid
          JOIN student s ON ps.stuid = s.student_id
          WHERE s.user_id = ?;
        `;
      } else{
                console.log('addm');

        sql = `
          SELECT project_id, description, catid, name, startdate, enddate, userid, percent, staus
          FROM project
          WHERE userid = ?;
        `;
      }

      const [result] = await connection.query(sql, params);
      return result;
    } catch (error) {
      console.error("Error fetching projects by user:", error);
      throw new Error("Internal server error");
    }
  }

    
    
}

module.exports = ProjectModel;
