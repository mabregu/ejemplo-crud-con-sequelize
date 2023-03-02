const Category = (sequelize, DataTypes) => {
  const model = sequelize.define('Category', {
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
      foreignKey: 'categoryId',
      as: 'products',
    });
  }

  return model;
};

module.exports = Category;