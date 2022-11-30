import express from "express";
import { body, validationResult } from "express-validator";
import db from "../services/validateDataService.js";

const router = express.Router();

router.post('/', async (request, response) => {
  const { data_req, periodo, bloco_aula } = request.body;
  const errors = validationResult(request);


  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }


  try {

    const results = await db.searchDate(data_req, periodo, bloco_aula);

    if (results == 0) {
      return response.status(200).json({ message: "Horário liberado!" });
    }
    else {
      return response.status(401).json({ message: "Horário já está em uso!" });
    }
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }

});

export default router;