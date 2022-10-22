import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/educationHubService.js';

const router = Express.Router();

router.post('/', [
    body('type_hub').isString().withMessage("Descreva corretamete o eixo educacional do curso"),

], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { type_hub } = request.body;


    try {

        await db.insertEducationHub(type_hub);
        response.status(201).json({ message: 'Eixo educacional cadastrado com sucesso' })

    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }
});

router.put('/', [
    body('type_hub').isString().withMessage("Descreva corretamete o eixo educacional do curso"),


], async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { type_hub, id } = request.body;

    try {
        await db.updateEducationHub(type_hub, id);
        response.status(200).json({ massage: 'Eixo educacional atualizado com sucesso.' })
    } catch (error) {
        response.status(500).json({ message: `Houve um problema ao atualizar os dados: ${error}` });
    }


});

router.delete('/:id', async (request, response) => {
    // nesse tipo de validação, a exclusão dos dados será através do ID direto na URL.
    const { id } = request.params;

    try {  //varifica se o ID existe e realiza a exclusão. Caso contrario, aparecerá a mensagem de erro com status 500
        await db.deleteEducationHub(id);
        response.status(200).json({ massage: 'Eixo educacional deletado.' })
    } catch (error) {
        response.status(500).json({ message: `Não foi possivel deletar esse laboratório: ${error}` });
    }
});

export default router