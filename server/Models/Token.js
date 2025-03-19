import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expiresIn: 3600 },
});

// Create and export the model
const Token = mongoose.model('Token', tokenSchema);
export default Token;
