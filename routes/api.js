import express from 'express';
import authRouter from './auth.routes.js';
import roleRoute from './role.routes.js';
import eventRoute from './event.route.js';
import ticketRoute from './ticket.routes.js';


const router = express.Router();


router.use('/auth', authRouter);
router.use('/roles', roleRoute);
router.use('/event', eventRoute);
router.use('/ticket', ticketRoute);






export default router;
