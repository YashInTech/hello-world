import UserModel from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../Models/Token.js';
import sendEmail from '../Utils/sendEmail.js';
import crypto from 'crypto';

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: 'User Already Exists', success: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    user = await userModel.save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();
    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, 'Verify your email', url);

    res
      .status(201)
      .json({ message: 'Verification Email Sent!', success: true });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: 'Email or Password is Wrong', success: false });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res
        .status(403)
        .json({ message: 'Email or Password is Wrong', success: false });
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });

      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString('hex'),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, 'Verify your email', url);
      }
      res.status(400).json({
        message: 'Please verify your email',
      });
    }

    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.status(201).json({
      message: 'Login Success',
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'Invalid Link', success: false });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({ message: 'Invalid Link', success: false });
    }
    await UserModel.updateOne({ _id: user._id }, { verified: true });
    await token.remove();
    res
      .status(200)
      .json({ message: 'Email Verified Successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

export { signup, login, verifyEmail };
