const AbilityRole = (sequelize, DataTypes) => {
  const model = sequelize.define('AbilityRole', {
    roleId: DataTypes.INTEGER,
    abilityId: DataTypes.INTEGER
  }, {});
  // model.associate = (models) => {
  //   model.belongsTo(models.Ability, { foreignKey: 'abilityId' });
  //   model.belongsTo(models.Role, { foreignKey: 'roleId' });
  // }

  return model;
}

module.exports = AbilityRole;