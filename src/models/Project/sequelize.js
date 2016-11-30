// Project model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project', {
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
        const Organization = models['Organization'];
        const Project = models['Project'];
        const User = models['User'];

        Project.belongsTo(Organization);
        Project.belongsToMany(User, {through: 'UserProjects'});
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
