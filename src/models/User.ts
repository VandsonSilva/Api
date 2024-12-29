import conn from "../data/conn";
import { CreationOptional, Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";


export interface IUser {
    id?: number;
    fistName: string;
    lastName: string;
    cpf: string;
    password: string;
    email: string;
}

class User extends Model <InferAttributes<User>, InferCreationAttributes<User>> {
    declare id?: CreationOptional<number>;
    declare fistName: string;
    declare lastName: string;
    declare cpf: string;
    declare password: string;
    declare email: string;
}

User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{sequelize: conn, timestamps: false},
);

export default User;