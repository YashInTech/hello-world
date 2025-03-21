import express from 'express';
import './Models/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import routerA from './Routes/AuthRouter.js';
import routerH from './Routes/HelloRouter.js';
import { verifyEmail } from './Controllers/AuthController.js';
import Profile from './Models/Profile.js';

const app = express();

app.get('/users/:id/verify/:token', verifyEmail);

app.use(bodyParser.json({ limit: '50mb' })); // Increase limit as needed
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow this origin
  })
);

app.use('/auth', routerA);
app.use('/helloworld', routerH);

app.post('/upload', async (req, res) => {
  const body = req.body;
  try {
    const existingProfile = await Profile.findOne(); // Check if a profile already exists
    if (existingProfile) {
      existingProfile.myFile = body.myFile; // Update the existing profile's image
      await existingProfile.save();
      res
        .status(200)
        .json({ message: 'Image updated successfully', existingProfile });
    } else {
      const newImage = await Profile.create(body);
      await newImage.save();
      res
        .status(201)
        .json({ message: 'Image uploaded successfully', newImage });
    }
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(409).json({ message: error.message });
  }
});

app.get('/images', async (req, res) => {
  try {
    Profile.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
