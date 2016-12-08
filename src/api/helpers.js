'use strict';

// ---------------------- Dependencies ---->>
const _ = require('lodash');

exports.applyModelIncludes = function(params, req, db) {
  const lookupTable = db.lookupTable;
  const models = db.models;
  var includes = [];
  // ie: ?include=category&include=file&include=image
  if (req.query.include) {
    var include = req.query.include;
    if (_.isArray(include)) {
      includes = _.clone(req.query.include);
    } else {
      includes.push(include);
    }
    includes = _.filter(_.map(includes, (include) => {
      const name = include.toLowerCase();
      if (name in lookupTable) {
        return {
          model: models[lookupTable[name]]
        };
      } else {
        console.log("Unknown model: ", name);
        return undefined;
      }
    }), function(include) {
      return include !== undefined;
    });
    params.include = includes;
  }

}
