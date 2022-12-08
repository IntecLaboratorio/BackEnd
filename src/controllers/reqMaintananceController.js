import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/reqMaintananceService.js';

const router = Express.Router();

router.post('/', [
    body("observation").isString().withMessage("Escreva sobre o problema encontrado. Ex: 'CPU aberta sem placa mãe'."),
], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { type_assent, room, num_room, observation, num_assent, user_req } = request.body;

    try { //varifica se todos os campos estão corretos para cadastrar. Caso não aparecerá a mensagem de erro com status 500
        await db.insertReqMaintanance(type_assent, room, num_room, observation, num_assent, user_req);

        response.status(201).json({ message: 'Solicitação registrada com sucesso!' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });

    }
});

router.put('/', async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { user_fin, whatWasDone, status_manutencao, id } = request.body;

    try {
        await db.updateReqMaintanance(user_fin, whatWasDone, status_manutencao, id);

        response.status(201).json({ message: 'Solicitação atualizada com sucesso!' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });

    }
});

router.get('/:id', async (request, response) => {
    const {id} = request.params

    const results = await db.viewReqMaintanance(id);
    
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

router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        await db.deleteMaintanace(id);
        response.status(200).json({ massage: 'Solicitação deletada.' })
    } catch (error) {
        response.status(500).json({ message: `Não foi possivel deletar essa solicitação: ${error}` });
    }
});


export default router