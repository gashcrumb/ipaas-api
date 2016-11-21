// Connection Model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Connection', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    icon: {
      type: DataTypes.STRING(50)
    },
    configuredProperties: {
      type: DataTypes.TEXT
    },
    position: {
      type: DataTypes.ENUM,
      values: ['Anywhere', 'From', 'To']
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Connection = models['Connection'];
        const ConnectionType = models['ConnectionType'];
        const Tag = models['Tag'];
        Connection.hasOne(ConnectionType, { as: 'Type' });
        Tag.belongsToMany(Connection, { through: 'TagsConnections' });
        Connection.hasMany(Tag);
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

