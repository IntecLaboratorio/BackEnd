import Express, { request, response } from 'express';
import { body, validationResult } from 'express-validator';
import db from '../services/address_service.js';

const router = Express.Router();

//Insert
router.post('/', [
    body('type_address').isString().withMessage('Diga o tipo de endereço: rua, avenida, etc.'),

    body('address').isString().withMessage('Escreva o longradouro do local'),

    body('number_address').isNumeric().withMessage('Escreva o número do local'),

    body('neighborhood').isString('Descreva o nome do bairro.'),

    body('city').isString('Qual cidade se encontra'),

    body('zip_code').isNumeric().isLength({ min: 8, max: 8 }),

], async (request, response) => {


    const errors = validationResult(request)
    if (!errors.isEmpty()) { //Verifica se o campo está vazio. Caso esteja retorna erro de bad request
        return response.status(400).json({ message: errors.array() });
    }

    const { type_address, address, number_address, complement, neighborhood, city, state, zip_code } = request.body;


    try { //varifica se todos os campos estão corretos para cadastrar. Caso contrario aparecerá a mensagem de erro com status 500
        await db.insertAddress(type_address, address, number_address, complement, neighborhood, city, state, zip_code)

        response.status(201).json({ message: 'Endereço cadastrado com sucesso' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }

});

// Update
router.put('/', [
    body('type_address').isString().withMessage('Diga o tipo de endereço: rua, avenida, etc.'),

    body('address').isString().withMessage('Escreva o longradouro do local'),

    body('number_address').isNumeric().withMessage('Escreva o número do local'),

    body('neighborhood').isString('Descreva o nome do bairro.'),

    body('city').isString('Qual cidade se encontra'),

    body('state').isString(),

    body('zip_code').isNumeric().isLength({ min: 8, max: 8 }),


], async (request, response) => {
    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({ message: error.array() });
    }

    const { type_address, address, number_address, complement, neighborhood, city, state, zip_code, id } = request.body;

    try {
        await db.updateAddress(type_address, address, number_address, complement, neighborhood, city, state, zip_code, id);
        response.status(200).json({ message: "Endereço atualizado com sucesso." });
    } catch (err) {
        response.status(500).json({ message: `Houve um problema ao atualizar os dados: ${err}` });
    }

});

router.delete('/:id', async (request, response) => {
    // nesse tipo de validação, a exclusão dos dados será através do ID direto na URL.
    const { id } = request.params;

    try { //varifica se o ID existe e realiza a exclusão. Caso contrario, aparecerá a mensagem de erro com status 500
        await db.deleteAddress(id);
        response.status(200).json({ message: "Endereço deletado com sucesso." })
    } catch (err) {
        response.status(500).json({ message: `Houve um problema ao excluir esse dado ${err}` })
    }
})

export default router;
