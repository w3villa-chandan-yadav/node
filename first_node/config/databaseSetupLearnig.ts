// const mysql2 = require("mysql2/promise")
// const dotenv = require("dotenv")
// dotenv.config()

// const pool = mysql2.createPool({
//     host:"localhost",
//     user:"root",
//     password:"root",
//     database:"jobportal",
//     connectionLimit:10,
//     queueLimit:0,
//     waitForConnections:true
// })


// exports.checkConnection = async()=>{

//     const connection = await pool.getConnection();


//     try {
//         const [rows] = await connection.query('SHOW DATABASES LIKE "jobportal"');
//         console.log(rows)
//         if (rows.length === 0) {
//             console.log('Database "jobportal" does not exist.');
//         
//             await connection.query('CREATE DATABASE jobportal');
//             console.log('Database "jobportal" has been created.');
//         } else {
//             console.log('Database "jobportal" exists.');
//         }
//         // console.log("connected to database");
//         connection.release()
//     } catch (error) {
//         console.log("Error connecting to database",error)

//     }
// }

// exports ={pool,checkConnection};







// // Route to get all users from the userTable in the "jobportal" database
// app.get('/users', async (req, res) => {
//     let connection;
//     try {
//         // Ensure we're using the "jobportal" database
//         connection = await pool.getConnection();
//         await connection.query('USE jobportal');  // Make sure to select the jobportal database

//         // Query to fetch all users from userTable
//         const [users] = await connection.query('SELECT * FROM userTable');
        
//         // Respond with the user data
//         res.status(200).json({ users });
//     } catch (error) {
//         console.log("Error fetching users", error);
//         res.status(500).json({ message: "Error fetching users from database" });
//     } finally {
//         if (connection) connection.release();  // Always release the connection
//     }
// });