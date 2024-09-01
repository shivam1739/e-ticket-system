import { getUserByEmail, verifyToken } from "../services/auth.services.js";



const isAuthenticated = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.json({
            status: 401,
            message: "JWT token is missing",
            data: {},
            err: "Invalid or missing argument in request header",
        });
    }
    const response = verifyToken(token);
    if (!response) {
        return res.json({
            status: 401,
            message: "JWT token is invalid",
            data: {},
            err: "Invalid or missing argument in request header",
        });
    }

    const user = await getUserByEmail(response.email);
    if (!user) {
        return res.json({
            status: 401,
            message: "JWT token send for an invalid user",
            data: {},
            err: "Invalid credentials  ",
        });
    }
    req.user = user;
    next();
};

export { isAuthenticated };