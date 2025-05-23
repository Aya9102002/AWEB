const connection = require("../Database");


class ProjectModel {
  static async getProject(user_id) {
    try {
      

      const projectSql =
"select *  from project where userid=?"
      const project=    await connection.queryAsync(projectSql, [user_id]);
  
  if(project.length ===0){
  return { message: "No Projects found !!", sucess: false};

  }
  else
  return { message: "Retrieving projects successfully", sucess: true,data:project };
    } catch (error) {
      console.error("Error getting projects", error);
      throw new Error("Internal server error");
    }
  }

  

   static async getProjectID(name) {
    try {
        console.log(name);
        
    const projectSql = "select project_id from project where name = ?"
    const projectid =  await connection.queryAsync(projectSql, [name]);


     
  
  return { message: "Retrieving project successfully", sucess: true,data:projectid };
    } catch (error) {
      console.error("Error getting projects", error);
      throw new Error("Internal server error");
    }
  }



    static async getAllProDetails(userid) {
    try {
        
    const projectSql = "      select p.description,p.name,p.percent,u.username, p.startdate,p.enddate,c.name as catname  from project p join prostu ps on p.project_id = ps.proid join student s on s.student_id = ps.stuid  join users u on u.user_id = s.user_id join category c on c.cat_id = p.catid where p.userid=?"
    const response =  await connection.queryAsync(projectSql, [userid]);


     
  
  return { message: "Retrieving project successfully", sucess: true,data:response };
    } catch (error) {
      console.error("Error getting projects", error);
      throw new Error("Internal server error");
    }
  }


   
}
module.exports = ProjectModel;
