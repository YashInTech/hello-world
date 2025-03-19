import express from 'express';
import './Models/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import routerA from './Routes/AuthRouter.js';
import routerH from './Routes/HelloRouter.js';

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', routerA);
app.use('/helloworld', routerH);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
