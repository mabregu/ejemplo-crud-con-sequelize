const User = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  model.associate = (models) => {
    // associations can be defined here
    model.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });
  }

  return model;
}

module.exports = User;