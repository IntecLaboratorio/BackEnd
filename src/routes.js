import express from "express";
import fixedAssent from './controllers/fixedAssentController.js';
import address from './controllers/addressController.js';
import instruction from './controllers/instructionController.js';
import labs from './controllers/labsController.js';
import user from './controllers/userController.js';
import login from './controllers/loginController.js';
import typeUser from './controllers/typeUserController.js';
import employee from './controllers/employeeController.js';
import reqMaintanance from './controllers/reqMaintananceController.js';
<<<<<<< HEAD
import schoolSubject from './controllers/schoolSubjectController.js';
=======
import reqLabs from './controllers/reqLabsController.js';
>>>>>>> d33664c46bc06542ed4f81951ceafa9f9c698852

const router = express.Router();

// verbo http USE, significa que o usuário fará várias requisições.
router.use('/fixedAssent', fixedAssent);
router.use('/address', address);
router.use('/instruction', instruction);
router.use('/labs', labs);
router.use('/user', user);
router.use('/login', login);
router.use('/typeUser', typeUser);
router.use('/employee', employee);
router.use('/reqMaintanance', reqMaintanance);
<<<<<<< HEAD
router.use('/schoolSubject', schoolSubject)
=======
router.use('/reqLabs', reqLabs);
>>>>>>> d33664c46bc06542ed4f81951ceafa9f9c698852

export default router;