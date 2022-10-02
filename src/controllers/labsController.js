import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/labsService.js';

const router = Express.Router();

//insert
router.post('/', [
    body('fk_instruction').isString().withMessage('Por favor, descreva a qual instituição essa sala ou laboratório pertence.'),

    body('name_lab').isString(),

    body('room_index').isString().withMessage("Descreva corretamente se é um laboratório ou sala de aula. "),

    body('floor_lab').isString().withMessage("Descreva em qual andar está localizado."),

], async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) { //Verifica se o campo está vazio. Caso esteja retorna erro de bad request
        console.log(errors.array())
        return response.status(400).json({ message: errors.array() });
    }

    const { fk_instruction, name_lab, room_index, floor_lab } = request.body;

    try { //varifica se todos os campos estão corretos para cadastrar. Caso não aparecerá a mensagem de erro com status 500
        await db.insertLabs(fk_instruction, name_lab, room_index, floor_lab)

        response.status(201).json({ message: 'Laboratório cadastrado com sucesso' })
    } catch (error) {
        console.log(">>>>>>", error)
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }


});


router.get('/', async (request, response) => {
    const results = await db.findLabs();

    try {
        if (results.length == 0) {
            response.status(204).json(results)
        } else {
            response.status(200).json(results)
        }

    } catch (err) {
        response.status(500).json({ message: `Erro encontrado: ${err}` });
    }
});

//update
router.put('/', [
    body('fk_instruction').isString().withMessage('Por favor, descreva a qual instituição essa sala ou laboratório pertence.'),

    body('name_lab').isString(),

    body('room_index').isString().withMessage("Descreva corretamente qual o esse laboratório ou sala de aula. "),

    body('floor_lab').isString().withMessage("Descreva em queal andar está localizado."),


], async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { fk_instruction, name_lab, room_index, floor_lab, id } = request.body;

    try {
        await db.updateLabs(fk_instruction, name_lab, room_index, floor_lab, id);
        response.status(200).json({ massage: 'laboratório atualizado com sucesso.' })
    } catch (error) {
        response.status(500).json({ message: `Houve um problema ao atualizar os dados: ${error}` });
    }


});

router.delete('/:id', async (request, response) => {
    // nesse tipo de validação, a exclusão dos dados será através do ID direto na URL.
    const { id } = request.params;

    try {  //varifica se o ID existe e realiza a exclusão. Caso contrario, aparecerá a mensagem de erro com status 500
        await db.deleteLabs(id);
        response.status(200).json({ massage: 'Laboratório deletado.' })
    } catch (error) {
        response.status(500).json({ message: `Não foi possivel deletar esse laboratório: ${error}` });
    }
});

export default router;
