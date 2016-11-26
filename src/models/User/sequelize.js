// User Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING(50),
      unique: true
    },
    uuid: {type: DataTypes.UUID},
    type: {type: DataTypes.STRING(50)},
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {type: DataTypes.STRING(100)},
    hash: {type: DataTypes.STRING(255)},
    hasAdminRight: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastName: {type: DataTypes.STRING(100)},
    password: {type: DataTypes.STRING(75), required: false},
    status: {type: DataTypes.STRING(50)}
  }, {
    classMethods: {
      associate: function(models) {
        const Integration = models['Integration'];
        const Organization = models['Organization'];
        const Role = models['Role'];
        const User = models['User'];

        User.belongsToMany(Organization, {through: 'UsersOrganizations'});
        User.belongsToMany(Role, {through: 'UsersRoles'});
        User.hasMany(Integration);
      }
    }
  }, {
    // Enable timestamps
    timestamps: true
  }, {
    getterMethods: {
      fullName: function() {
        return this.firstName + ' ' + this.lastName
      }
    },

    setterMethods: {
      fullName: function(value) {
        var names = value.split(' ');

        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
      }
    }
  });
};

