const Abilities = (sequelize, DataTypes) => {
  const model = sequelize.define('Abilities', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  model.associate = (models) => {
    model.belongsToMany(models.User, { through: 'UserAbility', foreignKey: 'abilityId' });
  }
  return model;
}

module.exports = Abilities;