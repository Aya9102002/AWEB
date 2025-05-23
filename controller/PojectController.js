const ProjectModel = require('../model/ProjectModel');

class ProjectController {
    static async getProject(req, res) {

        try {
            const userid= req.params.userid;
            const result = await ProjectModel.getProject(userid);
            console.log("Result from Project function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error getting project", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


 static async getProjectID(req, res) {

        try {
            const  name = req.params.name;
            console.log(name);
            
            const result = await ProjectModel.getProjectID(name);
            console.log("Result from Project function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error getting project", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

   

    static async getAllProDetails(req, res) {

        try {
            const  userid = req.params.userid;
            
            const result = await ProjectModel.getAllProDetails(userid);
            console.log("Result from Project function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error getting project", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

                     
    
}
module.exports = ProjectController;
