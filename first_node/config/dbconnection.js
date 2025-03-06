const mysql2 = require("mysql2/promise")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"jobportal",
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
})


const checkConnection = async ()=>{
    try {
        const connection =await pool.getConnection();
        console.log("Database connection successful");
        connection.release()
    } catch (error) {
        console.log("Database error connection")
        throw error
    }
}

module.exports ={pool ,checkConnection}


