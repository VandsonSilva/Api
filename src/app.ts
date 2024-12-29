import expres from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AppError from './helpers/AppError';
import conn from './data/conn';
import routes from './routes/Routes';
import User from './models/User';

const app = expres();
app.use(cors());
app.use(expres.json());
app.use(routes)

dotenv.config();

async function start() {  
    
    const PORT = process.env.PORT;

     try {
        await conn.authenticate()
        await conn.sync({force: true}).then(() => {
            app.get('/', (req, res) => {
                res.json({ message: 'on' })
            });
        
            app.listen(PORT, () => {
                console.log("server ON")
            });
        })      
    
    } catch(error:any) {
        if(error instanceof AppError) {
            throw error;
        }

        throw new AppError('Não foi possivel iniciar o servidor', 500)
    }
    
    
}

start();

