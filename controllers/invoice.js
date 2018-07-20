import { Invoice, Order } from '../models';

class InvoiceController {
  static createInvoice(request, response) {
    return Invoice.create(request.body).then((createdInvoice) => {
      const availableOrders = request.body.orders;
      availableOrders.forEach((orderData) => {
        Order.create({
          invoiceId: createdInvoice.id,
          product: orderData.product,
          price: orderData.price,
          quantity: orderData.quantity,
          total: orderData.total,
        }).then((createdOrder) => {
          if (!createdOrder) {
            response.status(500).send({ message: 'err' });
          }
        });
      });
      response.status(200).send({ message: 'orderSaved', createdInvoice });
    });
  }

  static getAllInvoices(request, response) {
    Invoice.findAll({ include: ['InvoiceDetail'] }).then(results => response.status(200).send({ message: results }));
  }

  static getInvoice(request, response) {
    Invoice.findOne({
      where: { id: request.params.id },
      include: ['InvoiceDetail'],
    }).then((result) => {
      if (!result) {
        return response.status(404).send({ message: 'not found' });
      }
      return response.status(200).send({ invoiceDetails: result });
    });
  }

  static deleteInvoice(request, response) {
    Invoice.findOne({
      where: {
        id: request.params.id,
      },
    }).then((selectedInvoice) => {
      if (!selectedInvoice) {
        return response.status(404).send({ message: 'not found' });
      }
      Order.destroy({
        where: {
          invoiceId: request.params.id,
        },
      });
      return Invoice.destroy({
        where: {
          id: request.params.id,
        },
      }).then(() => { response.status(200).send({ message: 'Deleted' }); });
    });
  }

  static updateInvoice(request, response) {
    Invoice.findOne({
      where: {
        id: request.params.id,
      },
    }).then((invoiceToUpdate) => {
      if (!invoiceToUpdate) {
        return response.status(404).send({ message: 'not found' });
      }
      return invoiceToUpdate.update(request.body, { fields: Object.keys(request.body) }).then(data => response.status(200).send({ message: 'Updated successfully', data }));
    });
  }
}
export default InvoiceController;
