const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming the token is in the Authorization header
        const secret = process.env.JWT_SECRET;

        console.log("Token: ", token);
        console.log("Secret: ", secret);

        const decoded = jwt.verify(token, secret);
        console.log("Decoded Token: ", decoded);

        req.user = decoded; // Assuming you want to attach the decoded token to the request object
        next();
    } catch (error) {
        console.error("JWT Verification Error: ", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
