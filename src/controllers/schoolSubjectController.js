import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/schoolSubjectService.js';

const router = Express.Router();

router.post('/', [
    body('name_school_subjetc').isString().withMessage("Por favor, insira a disciplina corretamente."),
    body('abbreviation').isString().withMessage('Insira a sigla do seu curso. Ex: ADM, DS, REDES'),
], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        // console.log(errors.array())
        return response.status(400).json({ message: errors.array() });
    }

    const { name_school_subjetc, abbreviation, schoolModule } = request.body

    try {
        await db.insertSchoolSubject(name_school_subjetc, abbreviation, schoolModule);
        response.status(201).json({ message: 'Funcionário cadastrado com sucesso' })

    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` }); 
    }
})

export default router