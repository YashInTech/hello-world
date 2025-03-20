import { Router } from 'express';
import { signup, login } from '../Controllers/AuthController.js';
import {
  loginValidation,
  signupValidation,
} from '../Middlewares/AuthValidation.js';

const routerA = Router();

routerA.post('/signup', signupValidation, signup);
routerA.post('/login', loginValidation, login);

export default routerA;
