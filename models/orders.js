

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
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
  Orders.associate = (models) => {
    // associations can be defined here
    Orders.belongsTo(models.Invoice, {
      foreignKey: 'invoiceId',
      onDelete: 'CASCADE',
    });
  };
  return Orders;
};
