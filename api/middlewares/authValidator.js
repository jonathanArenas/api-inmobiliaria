import jwt from 'jwt-simple';
import config from '../config/index.js';
import User from '../models/user.js';

const authValidator = async (req, res, next) => {
 
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(403).json({
      msg: 'Authorization header not found',
    });
  }

  try {
    const payload = jwt.decode(token, config.jwtSecret);
    const { userId } = payload;

    if (!userId) {
      return res.status(403).json({
        msg: 'Invalid Token',
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({
        msg: 'Invalid Token',
      });
    }
    req.user = user
    next();
  } catch (error) {
    return res.status(403).json({
      msg: 'Invalid Token',
    });
  }
};

export { authValidator };
