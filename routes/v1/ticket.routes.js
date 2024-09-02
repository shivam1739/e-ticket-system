import express from 'express';
import { buyTicketController, getTicketsByUserController } from '../../controller/ticket.controller.js';
import { isAuthenticated } from '../../middleware/authentication.middleware.js';



const ticketRoute = express.Router();
ticketRoute.post('/buy', isAuthenticated, buyTicketController);
ticketRoute.get('/my/booking', isAuthenticated, getTicketsByUserController);




export default ticketRoute;
