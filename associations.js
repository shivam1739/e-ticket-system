import Event from "./models/events.js";
import Role from "./models/role.js";
import Ticket from "./models/ticket.js";
import Token from "./models/token.js";
import User from "./models/user.js";


export default function setupAssociations() {
    // User and Role associations
    User.belongsToMany(Role, { through: 'UserRoles' });
    Role.belongsToMany(User, { through: 'UserRoles' });

    // User and Event associations
    User.hasMany(Event, { foreignKey: 'createdBy' }); // A user can create many events
    Event.belongsTo(User, { foreignKey: 'createdBy' }); // An event is created by one user

    // Event and Ticket associations
    Event.hasMany(Ticket, { foreignKey: 'eventId', as: 'tickets' }); // One-to-Many with Ticket
    Ticket.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

    // Ticket and User associations
    Ticket.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Many-to-One with User
    User.hasMany(Ticket, { foreignKey: 'userId', as: 'tickets' });

    //user and token associations
    User.hasOne(Token, { foreignKey: 'userId' }); // A user has one token
    Token.belongsTo(User, { foreignKey: 'userId' });
}
