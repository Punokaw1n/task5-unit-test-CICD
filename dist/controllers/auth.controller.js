"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const login = (req, res) => {
    const { username, password } = req.body;
    const myUsername = process.env.USER_NAME || "admin";
    const myPassword = process.env.PASSWORD || "password";
    console.log(username, myUsername);
    console.log(password, myPassword);
    // Verifikasi username dan password
    if (username === myUsername && password === myPassword) {
        // Set session cookie untuk menandakan login
        res.cookie("isAuthenticated", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        return res.json({
            status: "success",
            message: "Login berhasil",
        });
    }
    else {
        return res.status(401).json({ message: "username atau password salah" });
    }
};
exports.login = login;
const logout = (req, res) => {
    // Hapus cookie untuk logout
    res.clearCookie("isAuthenticated");
    return res.json({
        status: "success",
        message: "Logout berhasil",
    });
};
exports.logout = logout;
