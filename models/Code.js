const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = require('./Usuario');

const Code = db.define('code', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    design_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    html_route: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    css_route: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    javascript_route: {
        type: Sequelize.TEXT,
        allowNull: true
    }
}, {
    timestamps: true, 
});

Code.belongsTo(Usuario, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
});

module.exports = Code;
