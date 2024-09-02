import sequelize from '../config/database.js';
import Ticket from '../models/ticket.js';
import { getEventByIdService } from './event.services.js';


/**
 * Purchases a ticket for an event.
 *
 * @param {Object} purchaseData - The data for the ticket purchase.
 * @param {string} purchaseData.eventId - The ID of the event.
 * @param {string} purchaseData.userId - The ID of the user purchasing the ticket.
 * @param {number} purchaseData.price - The price of the ticket.
 * @returns {Promise<Ticket>} - A promise that resolves to the purchased ticket object.
 * @throws {Error} - Throws an error if the purchase fails.
 */




export async function buyTicketService(userId, eventId, quantity = 1) {
    const transaction = await sequelize.transaction();
    try {

        const checkEvent = await getEventByIdService(eventId)
        if (!checkEvent) {
            throw new Error('Event not found')
        }
        const availableTickets = await Ticket.findAll({
            where: {
                eventId,
                status: 'available',
            },
            order: [['createdAt', 'ASC']],
            limit: quantity,
            lock: transaction.LOCK.UPDATE,
            transaction,
        });


        if (availableTickets.length < quantity) {
            throw new Error('Not enough available tickets for this event.');
        }


        for (const ticket of availableTickets) {
            ticket.status = 'sold';
            ticket.userId = userId;
            await ticket.save({ transaction });
        }

        await transaction.commit();


        return availableTickets;
    } catch (error) {

        await transaction.rollback();
        console.error('Failed to purchase tickets:', error);
        throw new Error(error);
    }
}


/**
 * Service to get tickets by user ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to the list of tickets.
 */
export async function getTicketsByUserService(userId) {
    try {

        const tickets = await Ticket.findAll({
            where: {
                userId,
                status: 'sold',
            },
            include: [
                {
                    association: 'event',
                    attributes: ['id', 'name', 'date', 'venue'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });


        if (tickets.length === 0) {
            return { message: 'No tickets found for this user.' };
        }


        return tickets;
    } catch (error) {
        throw new Error(`Failed to fetch tickets for user ${userId}: ${error.message}`);
    }
}
