const User = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El email no es válido',
        },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rememberToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    socialNetworkId: {
      type: DataTypes.STRING,
      allowNull: true,
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