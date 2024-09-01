import { createEventService } from "../services/event.services.js";


export async function createEventController(req, res) {
    try {
        const eventData = { ...req.body, createdBy: req.user.id }; // Set createdBy from authenticated user
        const newEvent = await createEventService(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
