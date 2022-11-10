
import express from 'express';
import { singup, singin, verifyUser  } from '../controllers/authController.js';
import { userSignUpValidator } from '../middlewares/userSignupValidator.js';

const router = express.Router();
//register
router.route('/singup').post(userSignUpValidator, singup);
router.route('/verify/:token').get(verifyUser);
router.route('/singin').post(singin);


export default router;
