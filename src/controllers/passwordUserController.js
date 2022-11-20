import express from "express";
import { body, validationResult } from "express-validator";
import db from "../services/passwordUser.js";

const router = express.Router();

router.post('/', async (request, response) => {
  const { email, senha } = request.body;
  const errors = validationResult(request);
  const results = await db.selectPassword(email, senha);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  try {

    if (results == 0) {
      return response.status(401).json({ message: `Usuário não encontrado!` });
    }
    else {
      response.status(200).json({ message: "Usuário encontrado"});
    }
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }

});

export default router;