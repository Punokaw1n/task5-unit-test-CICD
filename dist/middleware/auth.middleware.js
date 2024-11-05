"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    const isAuthenticated = req.cookies.isAuthenticated;
    if (isAuthenticated === "true") {
        next();
    }
    else {
        res.status(401).json({ message: "Access denied. Please login." });
    }
};
module.exports = authMiddleware;
