import express from 'express';
import { signInController, signUpController } from '../../controller/auth.controller.js';


const authRouter = express.Router();
authRouter.post('/register/:userType', signUpController);
authRouter.post('/login/', signInController);


export default authRouter;
