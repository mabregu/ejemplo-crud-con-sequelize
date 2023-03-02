const ProductState = (sequelize, DataTypes) => {
  const model = sequelize.define('ProductState', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  
  model.associate = (models) => {
    // associations can be defined here
    model.hasMany(models.Product, {
      foreignKey: 'productStateId',
      as: 'products',
    });
  }
  
  return model;
}

module.exports = ProductState;