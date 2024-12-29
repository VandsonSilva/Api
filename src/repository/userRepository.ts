import AppError from '../helpers/AppError';
import User, { IUser } from '../models/User'

class UserRepository {

    public async createUser(record: IUser) {
        try {
            record.id = undefined;

            await this.existCpf(record.cpf)
            await this.existEmail(record.email)           

            const user = await User.create(record as User);
            const users = await User.findAll({ where: { id: user.id }, attributes: { exclude: ['password'] } });
            return users[0];
        } catch (error: any) {
            if (error instanceof AppError) {
                throw new AppError('Unable to create this user!', 404)
            }
        }

    }

    public async findById(id: number) {
        const user = await User.findAll({ where: { id }, attributes: { exclude: ['password'] } });
        if (user.length) return user[0];
        return null;
    }

    private async existCpf(cpf?: string, cpfCompare?: string) {
        if (!cpf) return;
        const exist = (await User.findAll({ where: { cpf } })).length > 0;

        if ((cpfCompare && cpf !== cpfCompare && exist) || exist) {
            throw new AppError('CPF já cadastrado', 500);
        }

    }

    private async existEmail(email?: string, emailCompare?: string) {
        if (!email) return;
        const exist = (await User.findAll({ where: { email } })).length > 0;

        if ((emailCompare && email !== emailCompare && exist) || exist) {
            throw new AppError('E-mail já cadastrado', 500);
        }

    }

    public async updateUser(id: number, record: IUser) {
        try {
            record.id = undefined;

            const user = await this.findById(id);

            if (!user) {
                throw new AppError('Usuario não encontrado', 404)
            }

            await this.existCpf(record.cpf)
            await this.existEmail(record.email)

            const updatedUser: IUser = { ...user.dataValues, ...record }

            await User.update(updatedUser, { where: { id } })

            const users = await User.findAll({ where: { id }, attributes: { exclude: ['password'] } });
            return users[0]

        } catch (error: any) {
            if (error instanceof AppError) {
                throw new AppError('Não foi possivel atualizar o usuario!', 404)
            }
        }

    }

    public async deleteUser(id: number) {
        return (await User.destroy({where: {id}})) > 0;
    }

    public async findAll() {
        const users =  await User.findAll({attributes: {exclude: ['password']}})
        if (users.length) return users[0];
        return null;
    }

}

export default UserRepository;