import express from 'express';
import { createRoleController } from '../../controller/role.controller.js';
import { isAdmin } from '../../middleware/authorization.middleware.js';



const roleRoute = express.Router();
roleRoute.post("/", isAdmin, createRoleController);

export default roleRoute;
