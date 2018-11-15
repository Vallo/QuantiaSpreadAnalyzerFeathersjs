// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const estado = sequelizeClient.define('estado', {
    crypto: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    spread: {
      type: DataTypes.DECIMAL,
      default:0,
      allowNull: false,
    },
    alertState:{
      type: DataTypes.STRING,
      default: 'Inicial',
      allowNull: false
    },
    weight:{
      type: DataTypes.INTEGER,
      default: 10,
      allowNull: false
    },
    Alert1:{
      type: DataTypes.DECIMAL,
      default: 0,
      allowNull: false
    },
    Alert2:{
      type: DataTypes.DECIMAL,
      default: 0,
      allowNull: false
    },
    Alert3:{
      type: DataTypes.DECIMAL,
      default: 0,
      allowNull: false
    },
    Alert4:{
      type: DataTypes.DECIMAL,
      default: 0,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  estado.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return estado;
};
