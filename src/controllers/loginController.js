import express from "express";
import { body, validationResult } from "express-validator";
import { request } from "express";
import { generateToken } from "../helpers/userfeatures.js";
import db from "../services/loginservice.js";

const router = express.Router();

router.post('/', [
  body('email').isEmail().withMessage('Informe um email válido'),
], async (request, response) => {
  const { type_user, email, password } = request.body;
  const errors = validationResult(request);
  const results = await db.selectLogin(type_user, email, password);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  console.log(results);
  try {
    if (results == 0) {
      return response.status(401).json({ message: `Usuário ou senha inválido` });
    } else {
      const { email, userName } = results[0];
      const token = generateToken(type_user, email, userName);
      response.status(200).json({ message: 'Login efetuado com sucesso', token });
    }
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }

});

export default router;
