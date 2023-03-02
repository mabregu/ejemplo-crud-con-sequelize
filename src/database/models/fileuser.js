const FileUser = (sequelize, DataTypes) => {
  const model = sequelize.define('FileUser', {
    userId: DataTypes.INTEGER,
    fileId: DataTypes.INTEGER
  }, {});
  model.associate = (models) => {
    model.belongsTo(models.File, { foreignKey: 'fileId' });
    model.belongsTo(models.User, { foreignKey: 'userId' });
  }

  return model;
}

module.exports = FileUser;