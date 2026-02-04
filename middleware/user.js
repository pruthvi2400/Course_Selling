const jwt = require("jsonwebtoken");
const { JWT_USER_SCERAT } = require("../config");

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : "";

    if (!token) {
        return res.status(401).json({ message: "Missing user token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_SCERAT);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid user token" });
    }
}

module.exports = { userMiddleware };
