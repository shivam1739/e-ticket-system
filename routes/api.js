import express from 'express';
import authRouter from './v1/auth.routes.js';
import roleRoute from './v1/role.routes.js';
import { isAuthenticated } from '../middleware/authentication.middleware.js';
import eventRoute from './v1/event.route.js';


const router = express.Router();


router.use('/v1/auth', authRouter);
router.use('/v1/roles', isAuthenticated, roleRoute);
router.use('/v1/event', isAuthenticated, eventRoute);





export default router;
