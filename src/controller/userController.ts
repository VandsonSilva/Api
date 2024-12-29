import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService"
import bc from 'bcryptjs'

export default class UserController {
    private static readonly _service = new UserService();

    public async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserController._service.findOne(parseInt(req.params.id));
            res.json({ user });
        } catch (error: any) {
            next(error)
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserController._service.findAll();
            res.json(users);
        } catch (error: any) {
            next(error)
        }


    }

    public async create(req: Request, res: Response, next: NextFunction) {

        const { fistName, lastName, cpf, password, email } = req.body;
        const salt = bc.genSaltSync(10);
        const hash = bc.hashSync(password, salt)

        const passwordhash = hash;

        const uses = {
            fistName,
            lastName,
            cpf,
            password: passwordhash,
            email
        }

        try {
            const user = await UserController._service.create(uses);
            res.json({ user })
        } catch (error: any) {
            next(error)
        }
    }

    public async put(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserController._service.update(parseInt(req.params.id), req.body);
            res.json({ user })
        } catch (error: any) {
            next(error)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deleted = await UserController._service.delete(parseInt(req.params.id));
            res.json({ status: 'ok', deleted })
        } catch (error: any) {
            next(error)
        }
    }
}

