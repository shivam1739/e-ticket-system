import { buyTicketService, getTicketsByUserService } from "../services/ticket.services.js";

export async function buyTicketController(req, res) {
    try {
        const { eventId, quantity } = req.body;

        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields: userId and eventId.' });
        }

        const userId = req.user.id
        const purchasedTickets = await buyTicketService(userId, eventId, quantity);

        return res.status(200).json({
            message: 'Tickets purchased successfully!',
            tickets: purchasedTickets,
        });
    } catch (error) {
        console.error('Error buying ticket:', error);
        return res.status(500).json({ message: error.message });
    }
}

export async function getTicketsByUserController(req, res) {
    try {
        const userId = req.user.id;


        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }


        const tickets = await getTicketsByUserService(userId);


        return res.status(200).json(tickets);
    } catch (error) {
        console.error('Error getting ticket:', error)
        return res.status(500).json({ message: error.message });
    }
}