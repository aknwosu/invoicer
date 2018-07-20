import express from 'express';
import InvoiceController from '../controllers/invoice';
import Auth from '../middleware/auth';

const router = express.Router();

router.route('/')
  .post(Auth.validateToken, InvoiceController.createInvoice)
  .get(Auth.validateToken, InvoiceController.getAllInvoices);

router.route('/:id')
  .get(Auth.validateToken, InvoiceController.getInvoice)
  .delete(Auth.validateToken, InvoiceController.deleteInvoice)
  .put(Auth.validateToken, InvoiceController.updateInvoice);

export default router;
