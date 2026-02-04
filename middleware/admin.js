const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SCERAT } = require("../config");

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : "";

    if (!token) {
        return res.status(401).json({ message: "Missing admin token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_SCERAT);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid admin token" });
    }
}

module.exports = { adminMiddleware };
