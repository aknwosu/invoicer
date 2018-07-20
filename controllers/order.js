import { Order } from '../models';

class OrderController {
  static updateOrder(request, response) {
    Order.findOne({
      where: {
        id: request.body.id,
      },
    }).then((orderToUpdate) => {
      if (!orderToUpdate) {
        return Order.create(request.body, { fields: Object.keys(request.body) }).then((createdOrder) => {
          if (!createdOrder) {
            return response.status(500).send({ message: 'err' });
          }
          response.status(200).send({ message: 'order created', createdOrder });
        });
      }
      return orderToUpdate.update(request.body, { fields: Object.keys(request.body) })
        .then(() => response.status(200).send({ success: true, message: 'Updated successfully' })).catch((err) => {
          response.status(400).send({
            err,
            message: 'Error occured while updating order',
          });
        });
    });
  }

  static getAllOrders(request, response) {
    Order.findAll().then(result => response.status(200).send({ message: result }));
  }

  static deleteOrder(request, response) {
    Order.findOne({
      where: {
        id: request.params.id,
      },
    }).then((order) => {
      if (!order) {
        return response.status(404).send({ message: 'not found' });
      }
      return Order.destroy({
        where: {
          id: request.params.id,
        },
      }).then(() => {
        response.status(200).send({ message: 'deleted successfully' });
      });
    });
  }
}
export default OrderController;
