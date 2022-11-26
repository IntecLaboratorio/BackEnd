import express, { response } from "express";
import { body, validationResult } from "express-validator";
import { request } from "express";
import db from "../services/userservice.js";

const router = express.Router();

router.post('/', [
  body('email').isEmail().withMessage('Informe um email válido'),
  body('password').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('A senha deve conter no mínimo 8 caracteres. Podendo ser letras maiúsculas ou minúsculas, números e caracteres especiais'),
], async (request, response) => {
  const { id_corporate, type_user, name_user, email, password, verify } = request.body;

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  try {
    await db.insertUser(id_corporate, type_user, name_user, email, password, verify);
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }

  response.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

router.get('/', async (request, response) => {
  const results = await db.findUser();

  try {
    if (results.length == 0) {
      response.status(204).end();
    } else {
      response.status(200).json(results);
    }
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }
});

router.put('/', [
  body('email').isEmail().withMessage('Informe um email válido'),
  body('password').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('A senha deve conter no mínimo 8 caracteres. Podendo ser letras maiúsculas ou minúsculas, números e caracteres especiais'),
], async (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  const { id_corporate, type_user, name_user, email, password, verify, id } = request.body;

  try {
    await db.upadateUser(id_corporate, type_user, name_user, email, password, verify, id);
    response.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` })
  }
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  db.deleteUser(id);
  try {
    response.status(200).json({ message: 'Item excluído com sucesso.' });
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` })
  }
});

export default router;