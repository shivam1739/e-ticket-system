import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Ticket from './ticket.js';

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalTickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: User,  // Reference User model
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: true,
});

Event.belongsTo(User, { foreignKey: 'createdBy' }); // An event is created by one user
User.hasMany(Event, { foreignKey: 'createdBy' }); // A user can create many events

Event.hasMany(Ticket, { foreignKey: 'eventId', as: 'tickets' }); // One-to-Many with Ticket
Ticket.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

export default Event;
