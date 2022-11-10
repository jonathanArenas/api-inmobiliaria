import express from 'express';
import { adminAccessValidator } from '../middlewares/adminAccesValidator.js';
import { propertyValidator } from '../middlewares/propertyValidator.js';
import { authValidator } from '../middlewares/authValidator.js';
import * as propertyCotroller from '../controllers/propertyController.js';
import multer from 'multer';
import { storage } from '../config/cloudi.js';
const upload = multer({storage: storage});
const router = express.Router();

router.route('/').get(authValidator).post(authValidator, upload.array('photos'), propertyValidator, propertyCotroller.create );
//router.route('/:id').get(userController.readById).put(updateUserValidator,userController.update);

export default router;
