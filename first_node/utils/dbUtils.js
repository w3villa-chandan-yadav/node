const { pool } = require("../config/dbconnection");

// const postTaleQuery =`CREATE TABLE IF NOT EXISTS posts (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             user_id INT NOT NULL,
//             title VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );`

const createTable = async () => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        );
        console.log("TABLE IS CREATED");
    } catch (error) {
        console.log("TABLE IS NOT CREATED, error:", error);
        throw error;
    }
};

module.exports = { createTable };
