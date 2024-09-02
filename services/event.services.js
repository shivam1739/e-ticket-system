
import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import Event from '../models/events.js';
import Ticket from '../models/ticket.js';
import { validateEventData } from '../utils/eventUtils.js';
import { generateTicketCode } from '../utils/ticketUtils.js';


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


    const transaction = await sequelize.transaction();
    try {
        const validationError = validateEventData(eventData);
        if (validationError) {
            throw new Error(validationError);
        }
        const event = await Event.create(eventData, { transaction });


        const tickets = [];
        for (let i = 0; i < event.totalTickets; i++) {
            tickets.push({
                code: generateTicketCode(),
                price: event.ticketPrice,
                status: 'available',
                eventId: event.id,
            });
        }

        await Ticket.bulkCreate(tickets, { transaction });

        await transaction.commit();
        return event;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}

/**
 * Retrieves all events from the database.
 *
 * @returns {Promise<Event[]>} - A promise that resolves to an array of event objects.
 * @throws {Error} - Throws an error if there is a problem retrieving the events.
 */

export async function getAllEventService() {
    try {

        const events = await Event.findAll();
        return events;
    } catch (error) {
        console.error('Error getting event:', error);
        throw new Error('Error getting event:');
    }
}


/**
 * Service to get an event by its ID.
 * @param {number} eventId - The ID of the event.
 * @returns {Promise<Object>} - A promise that resolves to the event object.
 * @throws {Error} - Throws an error if the event is not found or if there is a problem retrieving the event.
 */
export async function getEventByIdService(eventId) {
    try {

        const event = await Event.findOne({
            where: {
                id: eventId,
            },
            attributes: {
                include: [

                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM tickets 
                            WHERE tickets.eventId = Event.id 
                            AND tickets.status = 'sold'
                        )`),
                        'soldTicketCount',
                    ],
                ],
            },

        });

        if (!event) {
            throw new Error('Event not found.');
        }


        return event;
    } catch (error) {

        console.error('Error getting event by ID:', error);
        throw new Error(`Failed to retrieve event with ID ${eventId}: ${error.message}`);
    }
}