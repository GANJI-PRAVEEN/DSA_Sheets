
import express from 'express';
import cors from 'cors';
import dsaSheetsRouter from './routes/dsaSheetsRouter.js';

const app = express();
app.use(cors());


app.use(express.json());
app.use('/api/dsa-sheets',dsaSheetsRouter)  //https://dsa-sheets-jgbg.onrender.com/api/dsa-sheets

export default app
