import express from 'express';
import { createRoleController } from '../../controller/role.controller.js';
import { isAdmin } from '../../middleware/authorization.middleware.js';
import { isAuthenticated } from '../../middleware/authentication.middleware.js';



const roleRoute = express.Router();
roleRoute.post("/", createRoleController);

export default roleRoute;
