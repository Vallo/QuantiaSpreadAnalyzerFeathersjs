// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const cotizacion = sequelizeClient.define('cotizacion', {
    bidAvg: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    askAvg: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    last: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    crypto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  cotizacion.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return cotizacion;
};
