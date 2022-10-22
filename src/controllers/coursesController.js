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

router.put('/', [
    body('name_course').isString().withMessage("Descreva corretamete o nome do curso"),
   
    body('course_time').isString().withMessage("Diga quantos semestres esses curso possui."),
   
    body('initial_date').isDate(),
  
    body('final_date').isDate(),


], async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    const { fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date, id } = request.body;

    try {
        await db.updateCourse(fk_instruction, fk_type_hub, name_course, course_time, initial_date, final_date, id);
        response.status(200).json({ massage: 'Curso atualizado com sucesso.' })
    } catch (error) {
        response.status(500).json({ message: `Houve um problema ao atualizar os dados: ${error}` });
    }


});

router.delete('/:id', async (request, response) => {
    // nesse tipo de validação, a exclusão dos dados será através do ID direto na URL.
    const { id } = request.params;

    try {  //varifica se o ID existe e realiza a exclusão. Caso contrario, aparecerá a mensagem de erro com status 500
        await db.deleteCourse(id);
        response.status(200).json({ massage: 'Curso deletado.' })
    } catch (error) {
        response.status(500).json({ message: `Não foi possivel deletar esse laboratório: ${error}` });
    }
});

export default router