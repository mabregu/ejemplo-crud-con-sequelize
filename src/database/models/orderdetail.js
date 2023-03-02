const OrderDetail = (sequelize, DataTypes) => {
  const model = sequelize.define('OrderDetail', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {});

  model.associate = (models) => {
    // associations can be defined here
    model.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order',
    });
    model.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  }

  return model;
}

module.exports = OrderDetail;