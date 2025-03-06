// const { title } = require("process");
const { pool } = require("../config/dbconnection");
const jwt = require("jsonwebtoken")

exports.getAllusers = async(req,res)=>{
try {
    const [user]  = await  pool.query(
        "SELECT * FROM posts"
    );

    return res.status(200).json({
        success:true,
        message:"All users",
        user
    })
} catch (error) {
    console.log("error in the getting all the users",error)
}
}



exports.loginUser = async (req, res) => {
    const { title, userId } = req.body;
    
    const JWT_SECRET_KEY = 'chanda'; 
    
    try {
        const [existingUser] = await pool.query(
            "SELECT * FROM posts WHERE title = ? AND userId = ?",
            [title, userId]  
        );

        console.log(existingUser);

        if (existingUser.length === 0) {
            return res.status(401).send({ message: "User doesn't exist, please provide a valid title and userId." });
        }
    //   console.log(existingUser[0])
        //  console.log(existingUser[0]?.title)
        const payload = { title: existingUser[0].title, userId: existingUser[0].userId };
        
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); 

        return res.status(200).json({
            message: 'Login successful',
            token: token 
        });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send({ message: "Internal Server Error, please try again later." });
    }
}




 exports.indexController = async(req,res)=>{
    console.log(req.body)
    const { title, userId } = req.body;


    if(!title ,userId){
        return res.status(404).json({
            message:"please provide all the fields"
        })
    }


    // const newName = `chadnan${Math.random().toFixed(0)}`;
    // const newAge = (Math.random() * 100).toFixed(0);


    // const title = name ?? newName;
    // const userId = age ?? newAge;
   
    try {
     
        const [existingUser] = await pool.query(
            "SELECT * FROM posts WHERE title LIKE ?", 
            [`%${title}%`]
        );
        console.log(existingUser)
        if(!existingUser.length == 0){
            return res.status(401).send({message:"user already exists , name must be unique"})
        }

       const newuser =  await pool.query(
            "INSERT INTO posts ( user_id , title) Values (? , ?)"
        ,[userId , title])

        const [userDetails] = await pool.query(
            "SELECT * FROM posts WHERE user_id = ? AND title = ?",
            [userId, title]
        );
       
        console.log(userDetails);
        return res.status(200).json({userDetails})
    } catch (error) {
        console.log(error)
    }

}
exports.updatePost = async (req, res) => {
    const { userId ,title} = req.body ;
    // const userId = "123"
    // const title = "chandan"  

    if(!userId || !title){
        return res.status(405).json({
            message:"All fields are required"
        })
    }

    try {
        const [existingPost] = await pool.query(
            "SELECT * FROM posts WHERE user_id = ?",
            [userId]
        );
        if (existingPost.length === 0) {
            return res.status(404).send({ message: "Post not found" });
        }

        await pool.query(
            "UPDATE posts SET title = ? WHERE user_id = ?",
            [title, userId]
        );

        const [updatedPost] = await pool.query(
            "SELECT * FROM posts WHERE user_id = ?",
            [userId]
        );

        return res.status(200).json({ updatedPost });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while updating the post" });
    }
}
exports.deletePost = async (req, res) => {
    const {userId} = req.body ;
    // const userId = "123"
    try {
        const [existingPost] = await pool.query(
            "SELECT * FROM posts WHERE user_id = ?",
            [userId]
        );
        if (existingPost.length === 0) {
            return res.status(404).send({ message: "Post not found" });
        }

       
        await pool.query(
            "DELETE FROM posts WHERE user_id = ?",
            [userId]
        );

        return res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while deleting the post" });
    }
};

