import React from 'react'
import express from 'express';
import cors from 'cors';
import pathing from './routes/pathing.router';

const app = express();
app.use(cors());


app.use(express.json());
app.use("/api/dsa-sheets",pathing)  //https://dsa-sheets.onrender.com/api/dsa-sheets

export default app
