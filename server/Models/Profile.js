import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  myFile: String,
});

export default mongoose.model('Profile', profileSchema);
