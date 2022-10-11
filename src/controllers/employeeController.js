import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/typeUserService.js';

const router = Express.Router();

router.post('/', [

], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) { //Verifica se o campo está vazio. Caso esteja retorna erro de bad request
        console.log(errors.array())
        return response.status(400).json({ message: errors.array() });
    }

    const { fk_user, fk_typeUser, rm } = request.body;

    try {

        if (fk_typeUser == professor || coordenador) {
            await db.insertEmployee(fk_user, fk_typeUser, rm);
            response.status(201).json({ message: 'patrimonio cadastrado com sucesso' })
        }
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }
})