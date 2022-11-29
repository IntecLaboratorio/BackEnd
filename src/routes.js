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
import schoolSubject from './controllers/schoolSubjectController.js';
import reqLabs from './controllers/reqLabsController.js';
import educationHub from './controllers/educationHubController.js';
import courses from './controllers/coursesController.js';
import firstAccess from './controllers/firstAccessController.js';
import aceite from './controllers/aceiteController.js';
import passwordUser from './controllers/passwordUserController.js'
import validateEmail from "./controllers/validateEmailController.js";


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
router.use('/schoolSubject', schoolSubject)
router.use('/reqLabs', reqLabs);
router.use('/educationHub', educationHub);
router.use('/courses', courses);
router.use('/firstAccess', firstAccess);
router.use('/aceite', aceite);
router.use('/passwordUser', passwordUser);
router.use('/validateEmail', validateEmail);


export default router;