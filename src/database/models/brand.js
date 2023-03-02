const Brand = (sequelize, DataTypes) => {
  const model = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  
  model.associate = (models) => {
    // associations can be defined here
    model.hasMany(models.Product, {
      foreignKey: 'brandId',
      as: 'products',
    });
  }
  
  return model;
};

module.exports = Brand;
