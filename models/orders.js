

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    product: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.Invoice, {
      foreignKey: 'invoiceId',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
