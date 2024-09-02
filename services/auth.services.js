

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRoleByNameService } from "./role.services.js";
import User from "../models/user.js";
import Role from "../models/role.js";

/**
 * Registers a new user and assigns a role to the user.
 *
 * @param {Object} body - The user data.
 * @param {string} body.email - The user's email address.
 * @param {string} body.password - The user's password.
 * @param {string} body.username - The user's username.
 * @param {string} [body.image] - The URL of the user's profile image (optional).
 * @param {string} userType - The name of the role to be assigned to the user.
 * @returns {Promise<User>} - The created user object.
 * @throws {Error} - Throws an error if the role type is not found or if user creation fails.
 */

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
        });
        await signupResponse.addRole(role);
        return signupResponse;
    } catch (error) {
        console.error('Error creating user:', error);
        const message = error?.parent && error?.parent || error
        throw new Error(message)
    }
};


/**
 * Retrieves a user by their email address.
 *
 * @param {string} emailData - The email address of the user to retrieve.
 * @returns {Promise<User|null>} - The user object if found, otherwise null.
 * @throws {Error} - Throws an error if there is a problem with the query.
 */

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


/**
 * Retrieves a user by their ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<User|null>} - The user object if found, otherwise null.
 * @throws {Error} - Throws an error if there is a problem with the query.
 */

const getUserById = async (id) => {
    const response = await User.findOne({
        where: {
            id: id,
        },
        include: Role,
    });

    return response;
};


/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} pass - The plain text password to compare.
 * @param {string} hashPass - The hashed password to compare against.
 * @returns {boolean} - Returns true if the passwords match, otherwise false.
 */

const verifyPassword = (pass, hashPass) => {
    const response = bcrypt.compareSync(pass, hashPass);
    return response;
};


/**
 * Verifies a JWT token.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} - The decoded token payload if the token is valid, otherwise null.
 * @throws {Error} - Throws an error if the token is invalid or expired.
 */

const verifyToken = (token) => {
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return response;
    } catch (err) {
        console.log(err);
    }
};


/**
 * Adds a role to a user.
 *
 * @param {number} userId - The ID of the user to whom the role will be added.
 * @param {number} roleId - The ID of the role to be added to the user.
 * @returns {Promise<User>} - The updated user object with the new role.
 * @throws {Error} - Throws an error if the user or role is not found, or if adding the role fails.
 */

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

