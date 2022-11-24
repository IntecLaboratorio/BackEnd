import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/reqMaintananceService.js';

const router = Express.Router();

router.post('/', [
    body("fk_lab").isString(),
    body("num_sala").isNumeric().withMessage("Fale o número da sala."),
    body("requerement_date").isDate().withMessage("Por favor, fale a data."),
    body("observation").isString().withMessage("Por favor, explique o problema encontrado.")
], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { type_assent, fk_lab, num_sala, requerement_date, observation } = request.body;

    try { //varifica se todos os campos estão corretos para cadastrar. Caso não aparecerá a mensagem de erro com status 500
        await db.insertReqMaintanance(type_assent, fk_lab, num_sala, requerement_date, observation);

        response.status(201).json({ message: 'Solicitação registrada com sucesso!' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });

    }
});

router.get('/', async (request, response) => {
    const results = await db.viewReqMaintanance();

    try {
        if (results.length == 0) {
            response.status(204).json(results)
        } else {
            response.status(200).json(results)
        }

    } catch (err) {
        response.status(500).json({ message: `Erro encontrado: ${err}` });
    }
})


export default router