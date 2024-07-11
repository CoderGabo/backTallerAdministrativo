const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const Rol = require('./Rol'); // Importa el modelo Rol

const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supername: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Este correo ya está registrado'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'Introduce un correo válido'
            }
        }
    },
    phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Este número de teléfono ya está registrado'
        },
        validate: {
            isNumeric: {
                args: true,
                msg: 'El número de teléfono solo debe contener números'
            },
            len: {
                args: [7, 12],
                msg: 'El número de teléfono debe tener entre 7 y 12 caracteres'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    }
});

// Definir la relación Usuario - Rol
Usuario.belongsTo(Rol, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Usuario;
