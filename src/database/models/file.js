const File = (sequelize, DataTypes) => {
  const model = sequelize.define('File', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    extension: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.STRING,
    },
  }, {
    paranoid: true,
  });
  
  model.associate = (models) => {
    model.belongsToMany(models.User, {
      through: 'UserFiles',
      foreignKey: 'fileId',
      as: 'users',
    });
    model.belongsToMany(models.Product, {
      through: 'ProductFiles',
      foreignKey: 'fileId',
      as: 'products',
    });
  };

  return model;
};

module.exports = File;