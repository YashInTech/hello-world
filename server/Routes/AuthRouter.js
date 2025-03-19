import { Router } from 'express';
import { signup, login, verifyEmail } from '../Controllers/AuthController.js';
import {
  loginValidation,
  signupValidation,
} from '../Middlewares/AuthValidation.js';

const routerA = Router();

routerA.post('/signup', signupValidation, signup);
routerA.post('/login', loginValidation, login);
routerA.get('/:id/verify/:token', verifyEmail);

export default routerA;
