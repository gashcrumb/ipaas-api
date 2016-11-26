// Environment model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EnvironmentType', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Environment = models['Environment'];
        const EnvironmentType = models['EnvironmentType'];

        EnvironmentType.hasMany(Environment);
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
