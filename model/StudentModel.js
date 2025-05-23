const connection = require("../Database");


class StudentModel {
  static async getStudent() {
    try {
      

      const StuSql =
"select username from student s join users u on s.user_id = u.user_id  "
      const students=    await connection.queryAsync(StuSql, []);
  console.log(students);
  
  if(students.length ===0){
  return { message: "No Students found !!", sucess: false};

  }
  else
  return { message: "Retrieving students successfully", sucess: true,data:students};
    } catch (error) {
      console.error("Error getting studnets", error);
      throw new Error("Internal server error");
    }
  }




   static async getStudentID(userid) {
    try {
      
  const studdentSql = "select student_id from student where user_id = ?"
     const studentid =  await connection.queryAsync(studdentSql, [userid]);
  if(studentid.length ===0){
  return { message: "No Students found !!", sucess: false};

  }
  else
  return { message: "Retrieving students successfully", sucess: true,data:studentid};
    } catch (error) {
      console.error("Error getting studnets", error);
      throw new Error("Internal server error");
    }
  }

  

   
}
module.exports = StudentModel;
