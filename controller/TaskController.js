const connection = require('../Database');
const TaskModel = require('../model/TaskModel');

class TaskController {
    static async getTask(req, res) {

        try {
            const userid= req.params.userid;
            if(!userid){
                return      res.status(401).json({message :"Userid is requires"});

            }
            const result = await TaskModel.getTask(userid);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error Registering User", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


  static async addTask(req, res) {

        try {
 const {name,description,projectid,status,duedate,studentid} = req.body
            if(!name  || !description || !studentid || !status || !duedate ||!projectid){
                return      res.status(401).json({message :"All fields are requires"});

            }
            const result = await TaskModel.addTask(name,description,projectid,status,duedate,studentid);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error  Adding Task", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

   
        static async sortByProject(req, res) {

        try {
            const  userid = req.params.userid;
            
            const result = await TaskModel.sortByProject(userid);
            console.log("Result from Project function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error getting project", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }              
    

 static async sortByStatus(req, res) {

        try {
            const  userid = req.params.userid;
            
            const result = await TaskModel.sortByStatus(userid);
            console.log("Result from Project function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error getting project", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }              
    




    static async sortByDate(req, res) {

        try {
            const  userid = req.params.userid;
            
            const result = await TaskModel.sortByDate(userid);
            console.log("Result from Project function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error getting project", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }         
    
    


    static async sortByStu(req, res) {

        try {
            const  userid = req.params.userid;
            
            const result = await TaskModel.sortByStu(userid);
            console.log("Result from Project function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error getting project", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }         
    
}
module.exports = TaskController;
