import { createRoleService } from "../services/role.services.js";



const createRoleController = async (req, res) => {
    try {

        const data = req.body;
        const createdRole = await createRoleService(data);

        res.status(201).json(createdRole);
    } catch (error) {

        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Failed to create role' });
    }

}



export { createRoleController }