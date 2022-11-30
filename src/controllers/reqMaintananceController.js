import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/reqMaintananceService.js';

const router = Express.Router();

router.post('/', [
    body("requerement_date").isDate('yyyy-mm-dd').withMessage("Não deixe de colocar a data da solicitação"),
    body("observation").isString().withMessage("Escreva sobre o problema encontrado. Ex: 'CPU aberta sem placa mãe'."),
], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { type_assent, room, num_room, requerement_date, observation, num_assent } = request.body;

    try { //varifica se todos os campos estão corretos para cadastrar. Caso não aparecerá a mensagem de erro com status 500
        await db.insertReqMaintanance(type_assent, room, num_room, requerement_date, observation, num_assent);

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