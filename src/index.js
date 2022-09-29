import express from "express";
import routes from './routes.js';
import cors from 'cors';
const api = express();


api.use(cors());
api.use(express.json()); //faz a leitura dos arquivos em json


api.use('/', routes);

api.listen('3334', () => { // rota de ligação da API
    console.log('Server running!')
})