// Role model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Role', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Permission = models['Permission'];
        const Role = models['Role'];
        const User = models['User'];

        // Note that Roles are not configurable at the organizational level.
        // They should be fixed.

        // Many-to-many relationships
        Role.belongsToMany(User, {through: 'UsersRoles'});
        Role.belongsToMany(Permission, {through: 'RolesPermissions'});
      }
    }
  }, {
    // Enable timestamps
    timestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
