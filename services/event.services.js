
import Event from '../models/events.js';
import { validateEventData } from '../utils/eventUtils.js';


/**
 * Creates a new event.
 *
 * @param {Object} eventData - The data for the new event.
 * @param {string} eventData.name - The name of the event.
 * @param {string} eventData.description - The description of the event.
 * @param {Date} eventData.date - The date of the event.
 * @param {string} eventData.venue - The venue of the event.
 * @param {number} eventData.totalTickets - The total number of tickets available.
 * @returns {Promise<Event>} - The created event.
 * @throws {Error} - Throws an error if event creation fails.
 */


export async function createEventService(eventData) {

    const validationError = validateEventData(eventData);
    if (validationError) {
        throw new Error(validationError);
    }

    try {

        const newEvent = await Event.create(eventData);
        return newEvent;
    } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Error creating event');
    }
}
