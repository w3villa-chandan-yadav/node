const { pool } = require("../config/dbconnection")
const jwt = require("jsonwebtoken")

//fetch all the user to show in the ui for Admin ----1
exports.getAllUser = async(req,res)=>{
    try {
        console.log('user 1 ')
       const [users] = await pool.query("SELECT id,firstName,lastName,email,isAdmin FROM users");
       console.log("user")
       return res.status(200).json({
        success:true,
        message:"All users data",
        users
       })
    } catch (error) {
        res.status(500).json({
        success:false,
        message:"error in fetching data"
        })
       console.log("error in the fetching All users ",error)
    }
}


//Verify the user the it is valid or not by checking the database----2
exports.loginUser =async(req,res)=>{
    const {email} = req.body ;
    try {
        
        const [existingUser] = await pool.query(`
            SELECT * FROM users WHERE email = ?`,[email])

        if(existingUser.length ===0){
            return res.status(404).json({
                success:false,
                message:"please provide a valid email "
            })
        }
      
        const  token = await jwt.sign({...existingUser[0]},process.env.JWT_SECRET,{expiresIn:"2d"})

    //   console.log(token)
         
        res.status(200).json({
            success:true,
            message:"user login successful",
            existingUser,
            token
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
        console.log("error in the login users",error)
    }
}


//Create a new user in the database----3
exports.createUser =async(req,res)=>{
    const {firstName,email,lastName} = req.body;
    try {
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?",[email])

        if(existingUser.length !== 0){
            return res.status(400).json({
                success:false,
                message:"please provide a unique email"
            })
        }

        const [newUser] = await pool.query("INSERT INTO users (firstName,lastName,email) VALUES (? ,? ,?)",[firstName,lastName,email])
    
        const [newUserIs] = await pool.query("SELECT * FROM users WHERE id = ?",[newUser.insertId])


        // console.log(newUserIs)
        const token = await jwt.sign({...newUserIs[0]},process.env.JWT_SECRET,{expiresIn:"2d"})

        res.status(200).json({
            success:true,
            message:"User created successfully",
            user:newUserIs,
            token
        })
         
    } catch (error) {
        console.log("error in the creatingUser Routes",error);
        res.status(500).json({
            success:false,
            message:"please try after some, server don't response"
        })
    }
}

//Add task of user in the task table-----4
exports.createTask = async(req,res)=>{
    const {task,user_id} =req.body;
    try {

        if(!task || !user_id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const newTask = await pool.query("INSERT INTO tasks(task,user_id) VALUES (?,?)",[task,user_id])
  


        res.status(200).json({
            success:true,
            message:"task created successfully"
        })
    } catch (error) {
        console.log("error in the creating tasks ",error);
        res.status(500).json({
            success:false,
            message:"there is error in server please try again"
        })
    }
}

//update the task by both user and admin----5
exports.updateTask = async(req,res)=>{
    const {task , task_id ,user_id} = req.body ;
    try {
        if(!task || !task_id || !user_id){
            return res.status(400).json({
                success:false,
                message:"please provide all the fields"
            })
        }
        
        const [existingTask] = await pool.query("SELECT * FROM tasks WHERE id=? AND user_id =?",[task_id,user_id])

        console.log(existingTask)

        if(existingTask.length === 0){
            return res.status(400).json({
                success:false,
                message:"please provide a valid task and user id"
            })
        }
        

        const [updatedTask] = await pool.query("UPDATE tasks SET task = ? WHERE id =? AND user_id =?",[task,task_id,user_id])
   
        const [newTask] = await pool.query("SELECT * FROM tasks WHERE id =?",[existingTask[0].id])

        console.log(newTask)
        res.status(200).json({
            success:true,
            message:"Task updated successfuly",
            task:newTask
        })
    } catch (error) {
        console.log("error in the updating taskcontroller",error)
        res.status(500).json({
            success:false,
            message:"please try after some time , there is a server error"
        })
    }
}

//delete the task by both user and admin------6
exports.deletTask = async(req,res)=>{
    const {task_id ,user_id} = req.body;
    try {
        const [existingTask] = await pool.query("SELECT * FROM tasks WHERE id=? AND user_id=?",[task_id,user_id])

        console.log(existingTask)
        if(existingTask.length ===0){
            return res.status(400).json({
                success:false,
                message:"please provide a valid date"
            })
        }

        const deletedTask = await pool.query("DELETE FROM tasks WHERE id=? AND user_id =?",[task_id,user_id])

        res.status(200).json({
            success:true,
            message:"task deleted successfuly"
        })
       
    } catch (error) {
        console.log("error in deleteTask controller ",error)
        res.status(500).json({
            success:false,
            message:"please try after some time ,server error"
        })
    }
}

//get a single task by user and admin-------7
exports.getSingleTask =async(req,res)=>{
    const {task_id} = req.body;
    try {
        if(!task_id){
            res.status(400).json({
                success:false,
                message:"please provide a valid task id"
            })
            return 
        }
        const [singleTask] = await pool.query("SELECT * FROM tasks WHERE id = ?",[task_id])


        res.status(200).json({
            success:true,
            message:"single tasks",
            task :singleTask
        })

    } catch (error) {
        console.log("error in the getSingleTask controller",error);
        res.status(500).json({
            success:false,
            message:"please try again there is a server error"
        })
    }
}

//get all the task of single user
exports.getAllTask =async(req,res)=>{
    const {user_id} = req.body;
    try {
        if(!user_id){
            res.status(400).json({
                success:false,
                message:"please login to see the tasks"
            })
        }
        const [tasks] =await pool.query("SELECT * FROM tasks WHERE user_id =? ",[user_id])


        res.status(200).json({
            success:true,
            message:"All tasks of user",
            tasks:tasks
        })


    } catch (error) {
        console.log("error in the getting all the user in getAllUser controller",error)

        res.status(500).json({
            success:false,
            message:"please try after some time ,server error"
        })

    }
}

