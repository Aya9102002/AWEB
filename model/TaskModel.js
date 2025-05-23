const connection = require("../Database");


class TaskModel {
  static async getTask(userid) {
    try {

      const taskSql =
"select p.name as proname,t.name as taskname,t.description,u.username,t.status,t.duedate from project p join task t on p.project_id=t.projectid  join student s on s.student_id=t.studentid join users u on u.user_id=s.user_id where p.userid=?"
   const tasks =  await connection.queryAsync(taskSql, [userid ]);

   if(tasks.length === 0){
          return { message: "No tasks found", sucess: false };

   }
      return { message: "Fetching tasks successfully", sucess: true ,data:tasks};
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }

    static async addTask(name,description,projectid,status,duedate,studentid) {
    try {
//const projectSql = "select project_id from project where name = ?"
  //    const projetid =  await connection.queryAsync(projectSql, [projectname]);


    //  const userSql = "select user_id from users where username = ?"
      //const userid =  await connection.queryAsync(userSql, [student]);

       //const studdentSql = "select student_id from student where userid = ?"
     //const studentid =  await connection.queryAsync(studdentSql, [userid]);

      const taskSql ="insert into task (name,description,projectid,status,duedate,createdat,studentid) values(?,?,?,?,?,CURRENT_TIMESTAMP,?)"
    const tasks =  await connection.queryAsync(taskSql, [name,description,projectid,status,duedate,studentid]);

  
      return { message: "Adding tasks successfully", sucess: true ,data:tasks};
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }



  static async sortByProject(userid) {
      try {
          
      const projectSql = "select   p.name as proname ,t.name as taskname, t.description ,t.duedate,u.username, t.status from task t join project p on t.projectid = p.project_id join student s on t.studentid = s.student_id join users u on u.user_id = s.user_id  where p.userid=? order by p.name asc "
      const response =  await connection.queryAsync(projectSql, [userid]);
  
  
       
    
    return { message: "Retrieving project successfully", sucess: true,data:response };
      } catch (error) {
        console.error("Error getting projects", error);
        throw new Error("Internal server error");
      }
    }
  
  static async sortByStatus(userid) {
      try {
const projectSql = "SELECT p.name AS proname, t.name AS taskname, t.duedate, t.description, u.username, t.status FROM task t JOIN project p ON t.projectid = p.project_id JOIN student s ON t.studentid = s.student_id JOIN users u ON u.user_id = s.user_id  where p.userid=? ORDER BY CASE t.status WHEN 'Cancelled' THEN 1 WHEN 'Completed' THEN 2 WHEN 'On Hold' THEN 3 WHEN 'In Progress' THEN 4 WHEN 'Pending' THEN 5 ELSE 6 END ";
          
      const response =  await connection.queryAsync(projectSql, [userid]);
  
  
       
    
    return { message: "Retrieving project successfully", sucess: true,data:response };
      } catch (error) {
        console.error("Error getting projects", error);
        throw new Error("Internal server error");
      }
    }
  


    static async sortByStu(userid) {
      try {
          
      const projectSql = "select  p.name as proname ,t.name as taskname ,t.duedate, t.description ,u.username, t.status from task t join project p on t.projectid = p.project_id join student s on t.studentid = s.student_id join users u on u.user_id = s.user_id where p.userid=? order by u.username asc "
      const response =  await connection.queryAsync(projectSql, [userid]);
  
  
       
    
    return { message: "Retrieving project successfully", sucess: true,data:response };
      } catch (error) {
        console.error("Error getting projects", error);
        throw new Error("Internal server error");
      }
    }
  
   static async sortByDate(userid) {
      try {
          
      const projectSql = "select  p.name as proname ,t.name as taskname ,t.duedate, t.description ,u.username, t.status from task t join project p on t.projectid = p.project_id join student s on t.studentid = s.student_id join users u on u.user_id = s.user_id where p.userid=? order by t.duedate asc "
      const response =  await connection.queryAsync(projectSql, [userid]);
  
  
       
    
    return { message: "Retrieving project successfully", sucess: true,data:response };
      } catch (error) {
        console.error("Error getting projects", error);
        throw new Error("Internal server error");
      }
    }
   
}
module.exports = TaskModel;
