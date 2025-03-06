const { pool } = require("../config/dbconnection")


const createUserTable = async ()=>{
     try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            isAdmin ENUM('true','false') DEFAULT 'false',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        )
        console.log("ok users table")
     } catch (error) {
        console.log("error in creating the table of user",error)
     }
}

const taskTable = async ()=>{
    try {
       await pool.query(
        `CREATE TABLE IF NOT EXISTS tasks(
         id INT AUTO_INCREMENT PRIMARY KEY,
         task TEXT,
         user_id INT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
        );`
       ) 
       console.log("ok tasks table")

    } catch (error) {
                console.log("error in creating the table of task",error)

    }
}


module.exports = {createUserTable,taskTable}