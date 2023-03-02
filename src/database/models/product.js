const Product = (sequelize, DataTypes) => {
  const model = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {});
  
  model.associate = (models) => {
    // associations can be defined here
    model.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
    model.belongsTo(models.Provider, {
      foreignKey: 'providerId',
      as: 'provider',
    });
    model.belongsTo(models.ProductState, {
      foreignKey: 'productStateId',
      as: 'productState',
    });
  }
  
  return model;
}

module.exports = Product;