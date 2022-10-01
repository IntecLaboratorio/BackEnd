import express from "express";
import fixedAssent from './controllers/fixedAssentController.js';
import address from './controllers/addressController.js';
import instruction from './controllers/instructionController.js';
import labs from './controllers/labsController.js';
import user from './controllers/userController.js';

const router = express.Router();

// verbo http USE, significa que o usuário fará várias requisições.
router.use('/fixedAssent', fixedAssent);
router.use('/address', address);
router.use('/instruction', instruction);
router.use('/labs', labs);
router.use('/user', user);


export default router;