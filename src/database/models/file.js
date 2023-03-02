const File = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.INTEGER,
    extension: DataTypes.STRING,
    path: DataTypes.STRING
  }, {});
  File.associate = function(models) {
    // associations can be defined here
  };
  return File;
}

module.exports = File;