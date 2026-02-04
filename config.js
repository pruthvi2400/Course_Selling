require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL || "";
const JWT_ADMIN_SCERAT = process.env.JWT_ADMIN_SCERAT || "change-me-admin-secret";
const JWT_USER_SCERAT = process.env.JWT_USER_SCERAT || "change-me-user-secret";

module.exports={
    MONGODB_URL,
    JWT_ADMIN_SCERAT,
    JWT_USER_SCERAT,
};
