const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from cookies, body, or authorization header
        const token = req.cookies.token || req.body.token || req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please login to the correct account to perform this action"
            });
        }

        let decoded;

        try {
            decoded = await jwt.verify(token, process.env.JWT_SECRET); 
        } catch (error) {
            console.log("Invalid token string, please login again and try.");
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token, please login again."
            });
        }

        req.user = decoded;

        
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during authentication"
        });
    }
};

module.exports = authMiddleware;
