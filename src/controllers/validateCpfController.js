import express from "express";
import { body, validationResult } from "express-validator";
import db from "../services/validatecpf.js";

const router = express.Router();

router.post('/', async (request, response) => {
  const {cpf} = request.body;
  const errors = validationResult(request);
  

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }


  try {

    const results = await db.selectCpf(cpf);

    if (results == 0) {
      return response.status(200).json({ message: "Cpf ainda não cadastrados!" });
    }
    else {
      return response.status(401).json({ message: "cpf já utilizado!"});
    }
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }

});

export default router;