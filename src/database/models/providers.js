const Provider = (sequelize, DataTypes) => {
  const model = sequelize.define('Provider', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  
  model.associate = (models) => {
    // associations can be defined here
    model.hasMany(models.Product, {
      foreignKey: 'providerId',
      as: 'products',
    });
  }
  
  return model;
}

module.exports = Provider;