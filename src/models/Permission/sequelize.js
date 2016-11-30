// Permission model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Permission', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    description: {
      type: DataTypes.STRING(150)
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Permission = models['Permission'];
        const Role = models['Role'];

        // Each role consists of multiple permissions
        // The same permission can be common across many roles
        Permission.belongsToMany(Role, {through: 'RolesPermissions'});
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
