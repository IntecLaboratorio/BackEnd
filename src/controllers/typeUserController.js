import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/typeUserService.js';

const router = Express.Router();

router.post('/', [
    body('type_name').isString("Por favor, especifique qual o tipo de usuário que será cadastrado.")
], async (request, response) => {
    
    const errors = validationResult(request)
    if (!errors.isEmpty()) {

        return response.status(400).json({ message: errors.array() });
    }

    const {type_name} = request.body
    try { 
        await db.insertTypeUser(type_name)

        response.status(201).json({ message: 'Cadastrado com sucesso' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }
});


router.put('/', [
    body('type_name').isString("Por favor, atualize corretamente o tipo de usuário.")
], async (request, response) => {
    
    const errors = validationResult(request)
    if (!errors.isEmpty()) {

        return response.status(400).json({ message: errors.array() });
    }

    const {type_name, id} = request.body
    try { 
        await db.updateTypeUser(type_name, id)

        response.status(201).json({ message: 'Atualizado com sucesso' })
    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }
});

router.delete('/:id', async(request, response) => {
    const  {id} = request.params;

    try {
        await db.deleteTypeUser(id);
        response.status(200).json({message: "Item deletado com sucesso!"})
    } catch(err) {
        response.status(500).json({ message: `Houve um problema ao excluir esse dado ${err}` })
    }
})

export default router;