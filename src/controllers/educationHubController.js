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

export default router