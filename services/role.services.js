import Role from "../models/role.js";


async function createRoleService(roleData) {
    try {
        const { name } = roleData
        const createdRole = await Role.create({ name: name });
        return createdRole;
    } catch (error) {
        throw error;
    }
}

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