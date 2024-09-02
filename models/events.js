import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

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
    ticketPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
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

export default Event;
