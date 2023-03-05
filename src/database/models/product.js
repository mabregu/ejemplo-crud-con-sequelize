const Product = (sequelize, DataTypes) => {
  const model = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'El nombre del producto ya existe',
      },
      validate: {
        notNull: {
          msg: 'El nombre del producto es requerido',
        },
        notEmpty: {
          msg: 'El nombre del producto no puede estar vacío',
        },
        len: {
          args: [3, 255],
          msg: 'El nombre del producto debe tener entre 3 y 255 caracteres',
        },
        // isUnique: async (value, next) => {
        //   const product = await model.findOne({ where: { name: value } });
        //   if (product) {
        //     return next('El nombre del producto ya existe');
        //   }
        //   return next();
        // }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {});
  
  model.associate = (models) => {
    // associations can be defined here
    model.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
    model.belongsTo(models.Provider, {
      foreignKey: 'providerId',
      as: 'provider',
    });
    model.belongsTo(models.ProductState, {
      foreignKey: 'productStateId',
      as: 'productState',
    });
  }
  
  return model;
}

module.exports = Product;