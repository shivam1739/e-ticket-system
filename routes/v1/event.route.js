import express from 'express';
import { isAdmin } from '../../middleware/authorization.middleware.js';
import { createEventController, deleteEventController, getAllEventController, getEventByIdController } from '../../controller/event.controller.js';
import { isAuthenticated } from '../../middleware/authentication.middleware.js';



const eventRoute = express.Router();
eventRoute.get("/", getAllEventController);
eventRoute.delete("/:eventId", isAuthenticated, deleteEventController);
eventRoute.get("/:eventId", getEventByIdController);
eventRoute.post("/create", isAuthenticated, isAdmin, createEventController);



export default eventRoute;
