import { Router } from 'express';
import ensureAuth from '../Middlewares/Auth.js';

const routerH = Router();

routerH.get('/', ensureAuth, (req, res) => {
  console.log('logged in user', req.user);
  res.status(200).json({ message: 'Hello World' });
});

export default routerH;
