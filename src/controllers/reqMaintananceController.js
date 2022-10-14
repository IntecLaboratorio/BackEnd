import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/reqMaintananceService.js';

const router = Express.Router();

router.post('/', [
    body("requerement_date").isDate().withMessage("Não deixe de colocar a data da solicitação"),
    body("observation").isString().withMessage("Escreva sobre o problema encontrado. Ex: 'CPU aberta sem placa mãe'."),
], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) { 
        return response.status(400).json({ message: errors.array() });
    }

    const {requerement_date, observation, fk_employee} = request.body;

    try { //varifica se todos os campos estão corretos para cadastrar. Caso não aparecerá a mensagem de erro com status 500
        await db.insertReqMaintanance(requerement_date, observation, fk_employee);

        response.status(201).json({ message: 'Solicitação registrada com sucesso!' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });

    }
});


export default router