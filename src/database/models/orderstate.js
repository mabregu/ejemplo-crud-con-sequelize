const OrderState = (sequelize, DataTypes) => {
  const model = sequelize.define('OrderState', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  model.associate = (models) => {
    // associations can be defined here
    model.hasMany(models.Order, {
      foreignKey: 'orderStateId',
      as: 'orders',
    });
  };

  return model;
}

module.exports = OrderState;