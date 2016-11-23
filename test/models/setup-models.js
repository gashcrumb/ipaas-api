
const Models = require('../../src/models');
const db = new Models();

const self = {
  init: false,
  sequelize: db.sequelize,
  models: db.models,
  setUp: function(callback) {
    if (!self.init) {
      self.sequelize.sync({ force: true }).then(function() {
        self.init = true;
        callback();
      });
    } else {
      callback();
    }
  }
}

module.exports = self;

