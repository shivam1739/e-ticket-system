import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';
import Event from './events.js';
import Role from './role.js';


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate:
            async (user) => {
                const saltRounds = 10; // Adjust the number of salt rounds as needed
                user.password = await bcrypt.hash(user.password, saltRounds);
            },
    },
});

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

User.hasMany(Event, { foreignKey: 'createdBy' }); // A user can create many events
Event.belongsTo(User, { foreignKey: 'createdBy' }); // An event is created by one user

export default User;
