import crypto from 'crypto';

export function generateTicketCode(length = 10) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}