import Express, { request, response } from "express";
import { validationResult, body } from "express-validator";
import db from '../services/statusReqlabService.js';

const router = Express.Router();

// Busca
router.get('/', async (request, response) => {
  const results = await db.findStatusLab();

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

export default router