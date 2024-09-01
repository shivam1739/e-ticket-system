

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRoleByNameService } from "./role.services.js";



const signupService = async (body, userType) => {

    try {

        const role = await getRoleByNameService(userType);
        if (!role) {
            throw new Error('role type not found')
        }
        const signupResponse = await User.create({
            email: body.email,
            password: body.password,
            username: body.username,
            image: body.image,
        });
        await signupResponse.addRole(role);
        return signupResponse;
    } catch (error) {
        console.error('Error creating user:', error);
        const message = error?.parent && error?.parent || error
        throw new Error(message)
    }
};

const getUserByEmail = async (emailData) => {
    try {
        const response = await User.findOne({
            where: {
                email: emailData,
            },
            include: Role,
        });

        return response;

    }

    catch (error) {
        throw new Error(error.message)
    }
};

const getUserById = async (id) => {
    const response = await User.findOne({
        where: {
            id: id,
        },
        include: Role,
    });

    return response;
};

const verifyPassword = (pass, hashPass) => {
    const response = bcrypt.compareSync(pass, hashPass);
    return response;
};

const verifyToken = (token) => {
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return response;
    } catch (err) {
        console.log(err);
    }
};

const addRollToUser = async (userId, roleId) => {
    const user = await User.findOne({
        where: {
            id: userId,
        },
    });
    const role = await Role.findOne({
        where: {
            id: roleId,
        },
    });
    user.addRole(role);
    return user;
};
export {
    signupService,
    getUserByEmail,
    verifyPassword,
    verifyToken,
    addRollToUser,
    getUserById,
};