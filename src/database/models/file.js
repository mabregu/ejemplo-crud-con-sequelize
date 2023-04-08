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
    order_file: {
      type: DataTypes.INTEGER
    },
  }, {});
  
  model.associate = (models) => {
    model.belongsToMany(models.User, {
      through: 'UserFiles',
      foreignKey: 'fileId',
      as: 'users',
    });
    model.belongsToMany(models.Product, {
      through: 'FileProduct',
      foreignKey: 'fileId',
      as: 'products',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      hooks: true,
    });
    model.hasMany(models.FileProduct, {
      foreignKey: 'fileId',
      as: 'fileproducts',
    });
  };

  return model;
};

module.exports = File;