import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/employeeService.js';

const router = Express.Router();

router.post('/', [

    body('fk_user').isNumeric().withMessage("Por favor, informe o usuário"),

    body("rm").isNumeric().withMessage("Se possivel, informe a matricula do usuário")
    
], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {

        return response.status(400).json({ message: errors.array() });
    }

    const { fk_user, fk_typeUser, rm } = request.body;


    try {

        await db.insertEmployee(fk_user, fk_typeUser, rm);
        response.status(201).json({ message: 'Funcionário cadastrado com sucesso' })

    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }
})

router.put('/', [
    body('fk_user').isNumeric().withMessage("Por favor, informe o usuário"),

    body("fk_typeUser").isNumeric().withMessage("Atualize esse campo antes de avançar")
], async function (request, response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { fk_user, fk_typeUser, rm, id } = request.body;

    try {

        await db.updateEmployee(fk_user, fk_typeUser, rm, id);
        response.status(201).json({ message: 'Cargo atualizado com sucesso' })

    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }

});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    try { //varifica se o ID existe e realiza a exclusão. Caso contrario, aparecerá a mensagem de erro com status 500
        await db.deleteEmployee(id);
        response.status(200).json({ massage: 'Funcionário excluido com sucesso.' })
    } catch (error) {
        response.status(500).json({ message: `Não foi possivel deletar esse funcionário: ${error}` });
    }
});

export default router