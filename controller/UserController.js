const connection = require('../Database');
const UserModel = require("../model/UserModel");

class UserController {
    static async Register(req, res) {
   //     const { userId, finishedProjectId } = req.params;
        const { username,password } = req.body;

        try {
            if(!username || !password){
                            return res.status(401).json('result');

            }
            console.log(username);
            const result = await UserModel.Register(username, password);
            console.log("Result from Register function:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error Registering User", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }



    static async LogIn(req, res) {
        const { username,password } = req.body;
console.log(password)
        try {
            console.log(username);
            const result = await UserModel.LogIn(username, password);
            console.log("Result from Login:", result);
            return res.status(200).json(result);
                     
        } catch (error) {
            console.error("Error in login ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }





     static async getUserByToken(req, res) {


        const { token } = req.header.authorization?.split(' ')[1];

                    if(!token){
                                    return res.status(401).json(result);


                    }
              
        try {
                 const result = UserModel.getUserByToken(token)  ;
                 if(result.success){
             return res.status(200).json(result);

                 }
                 else{
                return res.status(401).json(result);

                 }
                     
        } catch (error) {
            console.error("Error getting user!! ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }




static async getUserID(req, res) {
    const username = req.params.username;
    console.log(username);

    if (!username) {
        return res.status(400).json({ message: "Username is required", success: false });
    }

    try {
        const result = await UserModel.getUserID(username);

        if (result.sucess) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.error("Error getting user!! ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


}





module.exports = UserController;
