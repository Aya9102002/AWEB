const bcrypt = require("bcrypt");
const connection = require("../database");
const jwt = require("jsonwebtoken");

const JWT_TOKEN = "udjglemglrhkALRGC";

class UserModel {

static async Register(username, password, role, studentId = null) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);


    const userSql = `
      INSERT INTO users (username, password, role, createdat) 
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await connection.query(userSql, [username, hashedPassword, role]);

    const userId = result.insertId; 


    if (role === 'student' && studentId) {
      const studentSql = `
        INSERT INTO student (student_id, user_id) 
        VALUES (?, ?)
      `;
      await connection.query(studentSql, [studentId, userId]);
    }

    return { message: "User added successfully", success: true };
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Internal server error");
  }
}

  static async LogIn(username, password) {
    try {
      const userSql = "SELECT * FROM users WHERE username = ?";
      const [userfound] = await connection.query(userSql, [username]);

      if (userfound.length === 0) {
        return { message: "User not found!!", success: false };
      }

      const user = userfound[0];

      const matchpass = await bcrypt.compare(password.trim(), user.password.trim());
      if (!matchpass) {
        return { message: "password dosnt match!!", success: false };
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
          username: user.username,
        },
        JWT_TOKEN,
        { expiresIn: "1h" }
      );

        return {
        message: "User logged in successfully",
        success: true,
        token: token,
        user: {
            user_id: user.user_id,
            username: user.username,
            role: user.role
        }
        };

    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }
static async getUserByToken(token) {
  try {
    const trimToken = token.trim();
    const decodeToken = jwt.verify(trimToken, JWT_TOKEN);

    const userSql = "SELECT user_id FROM users WHERE username = ?";
    const [userfound] = await connection.query(userSql, [decodeToken.username]);

    if (userfound.length === 0) {
      return { message: "User not found!!", success: false };
    }

    return { data: [{ user_id: userfound[0].user_id }], success: true, message: "User fetched successfully" };
  } catch (error) {
    console.error("Error fetching user by token:", error);
    throw new Error("Internal server error");
  }
}


  static async getUserID(username) {
    try {
      const userSql = "SELECT user_id FROM users WHERE username = ?";
      const [userid] = await connection.query(userSql, [username]);

      if (userid.length === 0) {
        return { message: "User not found!!", success: false };
      }

      return { data: userid, success: true };
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Internal server error");
    }
  }

}

module.exports = UserModel;
