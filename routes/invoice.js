import express from 'express';
import InvoiceController from '../controllers/invoice';

const router = express.Router();

router.route('/')
  .post(InvoiceController.createInvoice)
  .get(InvoiceController.getInvoice);

export default router;
