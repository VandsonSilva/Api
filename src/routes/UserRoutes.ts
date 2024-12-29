import { Router } from "express";
import UserController from "../controller/userController";

const userController = new UserController();

const routes = Router();

routes.get('/', userController.findAll);
routes.get('/:id', userController.findOne);
routes.post('/user', userController.create);
routes.put('/:id', userController.put);
routes.delete('/:id', userController.delete);

export default routes;