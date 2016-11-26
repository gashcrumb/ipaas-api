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
