const Order = (sequelize, DataTypes) => {
  const model = sequelize.define('Order', {
    orderStateId: {
      // "en proceso", "enviado", "entregado", "cancelado"
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {});

  // model.associate = (models) => {
  //   // associations can be defined here
  //   model.belongsTo(models.OrderState, {
  //     foreignKey: 'orderStateId',
  //     as: 'orderState',
  //   });
  //   model.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     as: 'user',
  //   });
  //   model.belongsTo(models.PaymentMethod, {
  //     foreignKey: 'paymentMethodId',
  //     as: 'paymentMethod',
  //   });
  //   model.hasMany(models.OrderDetail, {
  //     foreignKey: 'orderId',
  //     as: 'orderDetails',
  //   });
  // }

  return model;
}

module.exports = Order;