import express from 'express';
import { adminAccessValidator } from '../middlewares/adminAccesValidator.js';
import { propertyValidator } from '../middlewares/propertyValidator.js';
import { propertyEditValidator } from '../middlewares/propertyEditValidator.js';
import { authValidator } from '../middlewares/authValidator.js';
import * as propertyController from '../controllers/propertyController.js';

import multer from 'multer';
import { storage } from '../config/cloudi.js';
const upload = multer({storage: storage});
const router = express.Router();
//all

router.route('/filter').get(propertyController.filter);
//customer
router.route('/:id/myaccount').get(authValidator, propertyController.readPropertyCustomer);
router.route('/myaccount').get(authValidator, propertyController.listPropertyCustomer);
router.route('/:id/remove/customer').get(authValidator, propertyController.removeCustomer)
router.route('/:id/edit').put(authValidator, upload.array('photos'), propertyEditValidator, propertyController.updateCustomer );

//admin
router.route('/').get(authValidator, adminAccessValidator, propertyController.list).post(authValidator, upload.array('photos'), propertyValidator, propertyController.create );
router.route('/:id').get(authValidator, adminAccessValidator, propertyController.read).put(authValidator, adminAccessValidator, upload.array('photos'), propertyEditValidator, propertyController.update);
router.route('/:id/remove/').get(authValidator, adminAccessValidator, propertyController.remove)

export default router;
