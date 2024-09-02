import express from 'express';
import authRouter from './v1/auth.routes.js';
import roleRoute from './v1/role.routes.js';
import eventRoute from './v1/event.route.js';
import ticketRoute from './v1/ticket.routes.js';


const router = express.Router();


router.use('/v1/auth', authRouter);
router.use('/v1/roles', roleRoute);
router.use('/v1/event', eventRoute);
router.use('/v1/ticket', ticketRoute);






export default router;
