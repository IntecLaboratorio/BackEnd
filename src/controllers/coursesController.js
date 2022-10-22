import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/coursesService.js';

const router = Express.Router();

router.post('/', [
    
    body('name_course').isString().withMessage("Descreva corretamete o nome do curso"),
   
    body('course_time').isString().withMessage("Diga quantos semestres esses curso possui."),
   
    body('initial_date').isDate(),
  
    body('final_date').isDate(),

], async (request, response) => {

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date } = request.body;


    try {

        await db.insertCourse(fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date);
        response.status(201).json({ message: 'Curso cadastrado com sucesso' })

    } catch (error) {
        response.status(500).json({ message: `Erro encontrado: ${error}` });
    }
});

export default router