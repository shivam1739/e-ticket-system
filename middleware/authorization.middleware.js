import { getRoleByNameService } from "../services/role.services.js";


const isAdmin = async (req, res, next) => {
    const user = req.user;
    const adminRole = await getRoleByNameService("admin");
    const isAdmin = await user.hasRole(adminRole);
    if (!isAdmin) {
        return res.json({
            status: 401,
            message: "User is not admin",
            data: {},
            err: "Not authorized",
        });
    }

    next();
};

const isCustomer = async (req, res, next) => {
    const user = req.user;
    const adminRole = await getRoleByNameService("customer");
    const isAdmin = await user.hasRole(adminRole);
    if (!isAdmin) {
        return res.json({
            status: 401,
            message: "User is not admin",
            data: {},
            err: "Not authorized",
        });
    }

    next();
};

export { isAdmin, isCustomer };