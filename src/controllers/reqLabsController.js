import express from "express";
import { body, validationResult } from "express-validator";
import { request } from "express";
import db from "../services/reqLabsService.js";

const router = express.Router();

// Cadastro
router.post('/', async (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return response.status(400).json({ message: errors.array() });
  }

  const { fk_discipline, lab ,bloco_aula, periodo, data_req, fk_status_reqLab, user_req } = request.body;

  try {
    await db.insertReqLabs(fk_discipline, lab, bloco_aula, periodo, data_req, fk_status_reqLab, user_req)

    response.status(201).json({ message: 'Laboratório solicitado com sucesso' })
  } catch (error) {
    console.log(">>>>>>", error)
    response.status(500).json({ message: `Erro encontrado: ${error}` });
  }

});

// Busca
router.get('/:id', async (request, response) => {
  const {id} = request.params

  const results = await db.findReqLabs(id);
  
  try {
      if (results.length == 0) {
          response.status(204).json(results)
      } else {
          response.status(200).json(results)
      }

  } catch (err) {
      response.status(500).json({ message: `Erro encontrado: ${err}` });
  }
})

// Atualização
router.put('/', async (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  const { status_reqLab, user_fin, id } = request.body;

  try {
    await db.updateReqLabs(status_reqLab, user_fin, id);
    response.status(200).json({ massage: 'Solicitação atualizada com sucesso.' })
  } catch (error) {
    response.status(500).json({ message: `Houve um problema ao atualizar os dados: ${error}` });
  }


});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    await db.deleteReqLabs(id);
    response.status(200).json({ massage: 'Solicitação deletada.' })
  } catch (error) {
    response.status(500).json({ message: `Não foi possivel deletar essa solicitação: ${error}` });
  }
});

export default router;
