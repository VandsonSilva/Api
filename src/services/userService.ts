import AppError from "../helpers/AppError";
import { IUser } from "../models/User";
import UserRepository from "../repository/userRepository";
import Validators from '../services/existCpf'

class UserService {

    private readonly _repository  = new UserRepository();

    public async findOne(id: number) {
        if(Number.isNaN(id)) {
            throw new AppError('the Id is not a valid identifier', 400)
        }

        const user = await this._repository.findById(id)
        if(!user) {
            throw new AppError('User not found for ', 404)
        }

        return user;
    }

    public async create(record: IUser){

        if(record.cpf && !Validators.CpfExist(record.cpf)) {
            throw new AppError('wrong typed cpf format')
        }

        return await this._repository.createUser(record)

    }

    public async update(id: number, record:IUser) {
       
        if(record.cpf && !Validators.CpfExist(record.cpf)) {
            throw new AppError('wrong typed cpf format')
        }

        return await this._repository.updateUser(id, record)
    }

    public async delete(id:number) {
        if(Number.isNaN(id)) {
            throw new AppError('the Id is not a valid identifier', 400)
        }
        return await this._repository.deleteUser(id)
    }

    public async findAll() {
        return await this._repository.findAll()
    }

}

export default UserService