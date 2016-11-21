// Integration model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Integration', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    configuration: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.ENUM,
      // TODO define these
      values: ['draft', 'running', 'stopped', 'error']
    }
  }, {
    classMethods: {
      associate: function(models) {}
    }
  }, {
    // Enable timestamps
    timestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
