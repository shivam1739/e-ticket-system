import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from './config/database.js';
import router from './routes/api.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/', router);
app.get('/', (req, res) => {
    res.send('hello');
})

const PORT = process.env.PORT;

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

app.listen(PORT, () => {
    sequelize.sync({ force: true }).then(() => {
        console.log('Database synced with models and associations');
    });
    console.log(`Running on PORT ${PORT}`);
})