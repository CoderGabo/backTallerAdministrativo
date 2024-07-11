const Sequelize = require('sequelize');
const db = require('../config/db');

const Rol = db.define('rol', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Este rol ya está registrado'
    }
  }
});

module.exports = Rol;
