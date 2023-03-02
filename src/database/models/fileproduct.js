const FileProduct = (sequelize, DataTypes) => {
  const model = sequelize.define('FileProduct', {
    productId: DataTypes.INTEGER,
    fileId: DataTypes.INTEGER
  }, {});
  model.associate = (models) => {
    model.belongsTo(models.File, { foreignKey: 'fileId' });
    model.belongsTo(models.Product, { foreignKey: 'productId' });
  }

  return model;
}

module.exports = FileProduct;