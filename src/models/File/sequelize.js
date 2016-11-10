// File Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('File', {
    description: {type: DataTypes.TEXT}, // File Description
    name: {type: DataTypes.STRING(50)}, // File Name
    number: {type: DataTypes.STRING(155)}, // File Number
    path: {type: DataTypes.STRING(255)}, // Path to File
    type: {type: DataTypes.STRING(50)} // File Type
  });
};
