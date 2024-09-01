import express from 'express';
import { isAdmin } from '../../middleware/authorization.middleware.js';
import { createEventController } from '../../controller/event.controller.js';



const eventRoute = express.Router();
eventRoute.post("/create", isAdmin, createEventController);

export default eventRoute;
