const bcrypt = require("bcrypt");
const connection = require("../Database");
const JWT = require("jsonwebtoken");

const JWT_TOKEN = "udjglemglrhkALRGC";

class UserModel {
  static async Register(username, password) {
    try {
      //CURRENT_TIMESTAMP
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const userSql =
        "INSERT INTO web.users (username, password,role,createdat) VALUES (?, ?,'admin',CURRENT_TIMESTAMP)";

      await connection.queryAsync(userSql, [username, hashedPassword]);

      return { message: "User added successfully", sucess: true };
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }

  static async LogIn(username, password) {
    try {
      console.log(password)
      const userSql = "SELECT * FROM web.users where username = ?";
      const userfound = await connection.queryAsync(userSql, [username]);
      console.log(userfound[0])
      if (userfound.length == 0) {
        return { message: "User not found!!", sucess: false };
      }
          const user = userfound[0];

          console.log("User entered password:", password.trim());
console.log("Stored password in DB:", user.password.trim());
      const matchpass = await bcrypt.compare(password.trim(), user.password.trim());
      console.log(matchpass)
      if (!matchpass) {
        return { message: "password dosnt match!!", sucess: false };
      }

      const token = JWT.sign(
        {
          user_id: userfound.user_id,
          username: userfound.username,
        },
        JWT_TOKEN,
        { expiresIn: "1h" }
      );

      return {
        message: "User logged in successfully",
        sucess: true,
        token: token,
      };
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }

  static async getUserByToken(token) {
    try {
      const trimToken = token.trim();
      const decodeToken = await JWT.verify(trimToken, JWT_TOKEN);

      const userSql =
        "SELECT user_id,username,password FROM web.users where username = ?";

      const userfound = await connection.queryAsync(userSql, [
        decodeToken.username,
      ]);
      if (userfound.length == 0) {
        return { message: "User not found!!", sucess: false };
      }

      return { data: userfound, sucess: true };
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }





static async getUserID(username) {
    try {

     
     const userSql = "select user_id from users where username = ?"
     const userid =  await connection.queryAsync(userSql, [username]);
console.log(userid);


      if (userid.length === 0) {
        return { message: "User not found!!", sucess: false };
      }

      return { data: userid, sucess: true };
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }


}
module.exports = UserModel;
