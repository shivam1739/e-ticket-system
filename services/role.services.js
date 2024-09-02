import Role from "../models/role.js";

/**
 * Creates a new role in the database.
 *
 * @param {Object} roleData - The data for the new role.
 * @param {string} roleData.name - The name of the role to create.
 * @returns {Promise<Role>} - A promise that resolves to the created role object.
 * @throws {Error} - Throws an error if the role creation fails.
 */

async function createRoleService(roleData) {
    try {
        const { name } = roleData
        const createdRole = await Role.create({ name: name });
        return createdRole;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves a role by its name.
 *
 * @param {string} roleName - The name of the role to retrieve.
 * @returns {Promise<Role|null>} - A promise that resolves to the role object if found, otherwise null.
 * @throws {Error} - Throws an error if there is a problem retrieving the role.
 */

const getRoleByNameService = async (roleName) => {
    try {
        const response = await Role.findOne({
            where: {
                name: roleName,
            },
        });
        return response;
    } catch (error) {
        console.error('Error getting role by name:', error);
        return error
    }
};

export { createRoleService, getRoleByNameService };