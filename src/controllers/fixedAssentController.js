import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/fixedAssentService.js';

const router = Express.Router();

//insert
router.post('/', [
    //body('assent_number').isNumeric(), //declarando que é um campo numérico
    //body('assent_number').isLength({ min: 6, max: 6 }).withMessage('Informe corretamente os 6 digitos do patrimonio'), //validado quantidade máxima permitida

    body('serial_number').isString().withMessage('Por favor informe o número de série.'),

    body('assent_name').isString().withMessage('Por favor, informe o que está sendo cadastrado: computador, monitor, lousa, etc.'),

    body('brand').isString().withMessage('Informe a marca do produto como descrito na embalagem'),

    body('model').isString().withMessage('Informe o modelo do produto. Ele se encontra ao lado da marca'),

    body('product_batch').isString().withMessage('Informe o lote do produto, conforme descrito na etique do produto ou na documentação de entrega.'),

    // body('tax_invoice').isNumeric().withMessage('Infome a numeração da nota fiscal do produto conforme descrito na documentação do CPS'),

    body('fk_labs').isString().withMessage("Por favor, diga a qual laboratório esse patrimonio pertence"),

    body('complement').isString(),

    body('value_assent').isDecimal().withMessage('Coloque o preço verdadeiro do produto conforme documentado pelo CPS'),

    body('color').isString().withMessage('Descreva a cor do objeto que está sendo cadastrado'),

], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) { //Verifica se o campo está vazio. Caso esteja retorna erro de bad request
        console.log(errors.array())
        return response.status(400).json({ message: errors.array() });
    }

    const { assent_number, serial_number, assent_name, brand, model,
        product_batch, tax_invoice, fk_labs, complement, value_assent, verify, color }
        = request.body;

    console.log(request.body)


    try {
        const status_FA = (verify === "Ativo") ? 1 : 0 //condição IF/ELSE do campo de verificação do patrimonio
        await db.insertFixedAssent(assent_number, serial_number, assent_name, brand, model,
            product_batch, tax_invoice, fk_labs, complement, value_assent, status_FA, color);
        //varifica se todos os campos estão corretos para cadastrar. Caso contrário aparecerá a mensagem de erro com status 500
        response.status(201).json({ message: 'patrimonio cadastrado com sucesso' })
    } catch (error) {
        console.log(">>>>>>", error)
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }



});

//update
router.put('/', [
    body('assent_number').isNumeric(), //declarando que é um campo numérico
    body('assent_number').isLength({ min: 6, max: 6 }).withMessage('Informe corretamente os 6 digitos do patrimonio'), //validado quantidade máxima permitida

    body('serial_number').isString().withMessage('Por favor informe o número de série.'),

    body('assent_name').isString().withMessage('Por favor, informe o que está sendo cadastrado: computador, monitor, lousa, etc.'),

    body('brand').isString().withMessage('Informe a marca do produto como descrito na embalagem'),

    body('model').isString().withMessage('Informe o modelo do produto. Ele se encontra ao lado da marca'),

    body('product_batch').isString().withMessage('Informe o lote do produto, conforme descrito na etique do produto ou na documentação de entrega.'),

    body('tax_invoice').isNumeric().withMessage('Infome a numeração da nota fiscal do produto conforme descrito na documentação do CPS'),

    body('fk_labs').isString().withMessage("Por favor, diga a qual laboratório esse patrimonio pertence"),

    body('complement').isString(),

    body('value_assent').isDecimal().withMessage('Coloque o preço verdadeiro do produto conforme documentado pelo CPS'),

    body('color').isString().withMessage('Descreva a cor do objeto que está sendo cadastrado'),

], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { assent_number, serial_number, assent_name, brand, model,
        product_batch, tax_invoice, fk_labs, complement, value_assent, verify, color, id } = request.body;

    try {
        const status_FA = (verify === "Ativo") ? 1 : 0
        await db.updateFixedAssent(assent_number, serial_number, assent_name, brand, model,
            product_batch, tax_invoice, fk_labs, complement, value_assent, status_FA, color, id)

        response.status(201).json({ message: 'patrimonio atualizado' })
    } catch (error) {
        response.status(500).json({ message: `Houve um problema ao atualizar os dados: ${error}` })
    }

});

router.get('/', async (request, response) => {
    const results = await db.findFixedAssent();

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

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    // nesse tipo de validação, a exclusão dos dados será através do ID direto na URL.

    try { //varifica se o ID existe e realiza a exclusão. Caso contrario, aparecerá a mensagem de erro com status 500
        await db.deleteFixedAssent(id);
        response.status(200).json({ massage: 'Patrimonio deletado.' })
    } catch (error) {
        response.status(500).json({ message: `Não foi possivel deletar esse patrimonio: ${error}` });
    }
});

export default router