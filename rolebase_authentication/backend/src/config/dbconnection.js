const mysql = require("mysql2/promise")


const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
})

const checkConnection =async()=>{
    const  connection = await pool.getConnection();

    try {
        const [rows] = await connection.query(`SHOW DATABASES LIKE "management"`)
        
        if(rows.length === 0){
            console.log('Database "management" does not exist')
            await connection.query('CREATE DATABASE management')
            console.log('database "management" has been created')
        }else{
            console.log('database "management" already exist ! ')
        }
        await connection.query('USE management');
        console.log('Switched to "management"');
        connection.release()
    } catch (error) {
        console.log("error in connecting the database")
    }
}


module.exports ={pool ,checkConnection}