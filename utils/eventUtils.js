/**
 * Validates event data.
 *
 * @param {Object} eventData - The data to validate.
 * @returns {string|null} - Returns an error message if validation fails, otherwise null.
 */

export function validateEventData(eventData) {
    const { name, description, date, venue, totalTickets } = eventData;

    if (!name || typeof name !== 'string') {
        return 'Event name is required and must be a string.';
    }
    if (description && typeof description !== 'string') {
        return 'Event description must be a string.';
    }
    if (!date || !(date instanceof Date)) {
        return 'Event date is required and must be a valid date.';
    }
    if (!venue || typeof venue !== 'string') {
        return 'Event venue is required and must be a string.';
    }
    if (typeof totalTickets !== 'number' || totalTickets <= 0) {
        return 'Total tickets must be a positive number.';
    }

    return null; // No errors
}
