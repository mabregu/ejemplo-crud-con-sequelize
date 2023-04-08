const FileProduct = (sequelize, DataTypes) => {
  const model = sequelize.define('FileProduct', {
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    paranoid: true,
  });
  
  model.associate = (models) => {
    model.belongsTo(models.File, {
      foreignKey: 'fileId',
      as: 'file',
    });
    model.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return model;
}

module.exports = FileProduct;