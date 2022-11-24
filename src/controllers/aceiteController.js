import express from "express";
import { body, validationResult } from "express-validator";
import db from "../services/aceiteService.js";

const router = express.Router();

// Busca
router.get('/', async (request, response) => {
  const results = await db.procurarAceite();

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

// Atualização
router.put('/', async (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  const { id } = request.body;

  try {
    await db.updateAceite(id);
    response.status(200).json({ message: 'Requisição aceita com sucesso.' });
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` })
  }
});

export default router;
