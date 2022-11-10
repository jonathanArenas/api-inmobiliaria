import express from 'express';
import * as userController from '../controllers/userController.js';
import { updateCustomerInfoValidator } from '../middlewares/updateCustomerInfoValidator.js';
import { updateUserValidator } from '../middlewares/updateUserValidator.js';
import { adminAccessValidator } from '../middlewares/adminAccesValidator.js';
import { authValidator } from '../middlewares/authValidator.js';
const router = express.Router();


//routes custmer
router.route('/myinfo').get( authValidator, userController.myInfo)
router.route('/edit').put(authValidator, updateCustomerInfoValidator, userController.updateMyInfo);
//routes admin
router.route('/').get(authValidator, adminAccessValidator, userController.list);
router.route('/:id').get(authValidator, adminAccessValidator, userController.read).put(authValidator, adminAccessValidator, updateUserValidator,  userController.update);
router.route('/remove/:id').get(authValidator, adminAccessValidator, userController.remove);




export default router;
