import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const ensureAuth = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, JWT Token required.' });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, Wrong or Expired Token.' });
  }
};

export default ensureAuth;
