const StudentModel = require('../model/StudentModel');

class StudentController {
    static async getStudent(req, res) {

        try {
            const result = await StudentModel.getStudent();
            console.log("Result from GetStudent function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
          //  console.error("Error getting student", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }





     static async getStudentID(req, res) {

        try {
            const user_id = req.params.user_id

            if(!user_id){
                            return res.status(400).json("UserID required");

            }
            const result = await StudentModel.getStudentID(user_id);
            console.log("Result from GetStudent function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
          //  console.error("Error getting student", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }



   
                     
    
}
module.exports = StudentController;
