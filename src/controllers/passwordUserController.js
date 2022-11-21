import express from "express";
import { body, validationResult } from "express-validator";
import db from "../services/passwordUser.js";

const router = express.Router();

router.post('/', async (request, response) => {
  const { email, senhaAtual } = request.body;
  const errors = validationResult(request);
  const results = await db.selectPassword(email, senhaAtual);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  try {

    if (results == 0) {
      return response.status(401).json({ message: `Usuário não encontrado!` });
    }
    else {
      response.status(200).json("true");
    }
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }

});

router.put('/', async (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  const { senha, email } = request.body;

  try {
    await db.updatePassword(senha, email);
    response.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` })
  }
});

export default router;