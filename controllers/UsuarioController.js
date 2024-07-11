const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validar email y phone
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Introduce un correo válido' });
    }
    if (!validator.isNumeric(phone) || phone.length < 7 || phone.length > 12) {
      return res.status(400).json({ error: 'Introduce un número de teléfono válido' });
    }
    const usuario = await Usuario.create(req.body);
    res.status(201).json({usuario, mensaje: 'Usuario creado exitosamente'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: Rol });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, { include: Rol });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Validar email y phone si son proporcionados
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Introduce un correo válido' });
    }
    if (phone && (!validator.isNumeric(phone) || phone.length < 7 || phone.length > 12)) {
      return res.status(400).json({ error: 'Introduce un número de teléfono válido' });
    }

    // Encriptar contraseña si es proporcionada
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    await usuario.update(req.body);
    res.status(200).json({usuario, mensaje: 'Usuario actualizado exitosamente'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.destroy();
    res.status(204).json({mensaje: 'Usuario eliminado exitosamente'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ 
      where: { email },
      include: [
        {
          model: Rol, // Modelo de Rol
          attributes: ['id', 'nombre'] // Atributos del rol que deseas incluir
        }
      ]
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Correo inválido' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      return res.status(404).json({ error: 'Contraseña inválida' });
    }

    console.log(usuario)
    const usuarioConRol = {
      supername: usuario.supername,
      email: usuario.email,
      phone: usuario.phone,
      rol: usuario.rol ? usuario.rol.nombre : null, // Nombre del rol
      // Puedes incluir más campos según sea necesario
    };


    // Aquí podrías implementar la lógica para generar un token de sesión si estuvieras utilizando autenticación JWT u otro método.
    // Por ahora, simplemente retornamos éxito.
    res.status(200).json({usuario: usuarioConRol, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout de usuario (simplemente para dar referencia, no realiza acción concreta en este contexto)
exports.logout = async (req, res) => {
  try {
    // Aquí podrías realizar la lógica para cerrar la sesión, como limpiar tokens de sesión, etc.
    // En este caso, no se está utilizando autenticación, por lo que no hay acción específica de logout.
    res.status(200).json({ message: 'Sesión cerrada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};