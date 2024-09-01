import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

import { generateTicketCode } from '../utils/ticketUtils.js';
import Event from './events.js';
import User from './user.js';

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('available', 'sold', 'reserved'),
        defaultValue: 'available',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Ticket',
    tableName: 'tickets',
    timestamps: true,
    hooks: {
        beforeCreate: (ticket) => {
            ticket.code = generateTicketCode(); // Assign a unique code before saving
        },
    },
});

// Associations

Ticket.belongsTo(Event, { foreignKey: 'eventId', as: 'event' }); // Many-to-One with Event
Event.hasMany(Ticket, { foreignKey: 'eventId', as: 'tickets' });

Ticket.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Many-to-One with User
User.hasMany(Ticket, { foreignKey: 'userId', as: 'tickets' });
export default Ticket;
