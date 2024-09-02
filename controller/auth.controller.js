import { getUserByEmail, signupService, verifyPassword } from "../services/auth.services.js";
import jwt from "jsonwebtoken";

const signUpController = async (req, res) => {
    try {
        const { username, email, password } = req.body;


        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        await signupService(req.body, req.params.userType)
        res.status(201).json({ success: true, message: 'user created successfully' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
}

const signInController = async (req, res) => {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            throw new Error('Missing required fields: email or password')
        }
        const userData = await getUserByEmail(req.body.email);

        if (!userData) {
            return res.status(401).json({
                message: "invalid email and password please try again",
            });
        }

        const passwordVerified = verifyPassword(
            req.body.password,
            userData.password
        );

        if (!passwordVerified) {
            return res.status(401).json({
                message: "invalid email and password please try again",
            });
        }

        var token = jwt.sign(
            {
                email: userData.email,
                password: userData.password,
                username: userData.username,
            },
            process.env.JWT_SECRET_KEY
        );

        userData.password = undefined;
        return res.status(200).json({
            message: "successfully sign in ",
            success: true,
            data: userData,
            token: token,
        });

    }
    catch (error) {
        console.error('Error while user login:', error);
        res.status(500).json({ message: 'Failed to login user', error: error.message });
    }
};

export { signUpController, signInController }