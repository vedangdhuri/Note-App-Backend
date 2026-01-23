export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization Token is missing or invalid"
            })
        }
    } catch (error) {
        
    }
}