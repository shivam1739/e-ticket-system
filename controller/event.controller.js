import { createEventService, getAllEventService, getEventByIdService } from "../services/event.services.js";


export async function createEventController(req, res) {
    try {
        const eventData = { ...req.body, createdBy: req.user.id };
        const newEvent = await createEventService(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getAllEventController(req, res) {
    try {

        const newEvent = await getAllEventService();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getEventByIdController(req, res) {
    try {
        const { eventId } = req.params;


        if (!eventId) {
            return res.status(400).json({ message: 'Event ID is required.' });
        }


        const event = await getEventByIdService(eventId);


        return res.status(200).json(event);
    } catch (error) {
        console.error('Error getting Event:', error);

        return res.status(500).json({ message: error.message });
    }
}

