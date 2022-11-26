import Express, { request, response } from "express";
import { validationResult, body } from 'express-validator';
import db from '../services/instructionService.js';

const router = Express.Router();

//insert
router.post('/', [
    // body('fk_address').isString(),

    body('corporate_name').isString(),

    body('cnpj').isNumeric(), //declarano campo numerico
    body('cnpj').isLength({ min: 14, max: 14 }), //definindo quantidade de caracteres

    body('phone').isNumeric({ min: 10, max: 10 }).withMessage('Passe o número de contato corretamente. Ex: (xx) 1234-5678'),

    body('email').isEmail().withMessage("Escreva o email corretamente, por favor"),

    body('responsable').isString().withMessage('Informe o responsavel da instituição.'),

], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) { //Verifica se o campo está vazio. Caso esteja retorna erro de bad request
        return response.status(400).json({ message: errors.array() });
    }

    const {corporate_name, cnpj, phone, email, responsable } = request.body;

    try { //varifica se todos os campos estão corretos para cadastrar. Caso não aparecerá a mensagem de erro com status 500
        await db.insertInstruction(corporate_name, cnpj, phone, email, responsable);

        response.status(201).json({ message: 'Instituição cadastrada com sucesso!' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });

    }

});

//update
router.put('/', [
    body('fk_address').isString(),

    body('corporate_name').isString(),

    body('cnpj').isNumeric(),
    body('cnpj').isLength({ min: 14, max: 14 }),

    body('phone').isNumeric({ min: 10, max: 10 }).withMessage('Passe o número de contato corretamente. Ex: (xx) 1234-5678'),

    body('email').isEmail().withMessage("Escreva o email corretamente, por favor"),

    body('responsable').isString(),

], async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { corporate_name, cnpj, phone, email, responsable, id } = request.body;

    try { //varifica se houve alteração em algum campo para atualizar. Caso não aparecerá a mensagem de erro com status 500
        await db.updateInstruction(corporate_name, cnpj, phone, email, responsable, id);
        response.status(200).json({ message: "Dados da instituição atualizados com sucesso." })
    } catch (error) {
        response.status(500).json({ message: `Ocorreu um problema ao ataulizar os dados: ${error}` });
    }
});

router.delete('/:id', async (request, response) => {
    // nesse tipo de validação, a exclusão dos dados será através do ID direto na URL.
    const { id } = request.params;

    try { //varifica se o ID existe e realiza a exclusão. Caso contrario, aparecerá a mensagem de erro com status 500
        await db.deleteInstruction(id);
        response.status(200).json({ message: "Instituição excluida com sucesso" });
    } catch (error) {
        response.status(500).json({ message: `Não foi possivel excluir essa instituição: ${error}` });
    }
});

export default router;