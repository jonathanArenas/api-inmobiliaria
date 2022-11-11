import express from 'express';
import * as offerController from '../controllers/offerController.js';
import { authValidator } from '../middlewares/authValidator.js';

const router = express.Router();
//all

router.route('/property/:id').post(offerController.create).get(authValidator, offerController.list);
router.route('/:id').get(authValidator, offerController.read)

export default router;