import { Invoice, Order } from '../models';

class InvoiceController {
  static createInvoice(request, response) {
    // console.log('created invoice???===>>', request.body.orders);
    console.log('order start ====>>', request.body, '<<====order end');

    Invoice.create(request.body).then((createdInvoice) => {
      const availableOrders = request.body.orders;
      console.log('order start ====>>', request.body, availableOrders, '<<====order end');
      availableOrders.forEach((orderData) => {
        console.log('order start ====>>', orderData, '<<====order end');
        Order.create({
          invoiceId: createdInvoice.id,
          product: orderData.product,
          price: orderData.price,
          quantity: orderData.quantity,
          total: orderData.total,
        }).then((createdOrder) => {
          if (createdOrder) {
            return response.status(200).send({ message: 'orderSaved', createdOrder });
          }
          return response.status(500).send({ message: 'err' });
        });
      });
    });
  }

  static getInvoice(request, response) {
    response.status(200).send({ message: 'did you store any invoice' });
  }
}
export default InvoiceController;
