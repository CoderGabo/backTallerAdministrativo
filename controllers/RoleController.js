const Rol = require('../models/Rol');

// Crear un nuevo rol
exports.crearRole = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un rol por ID
exports.obtenerRolePorId = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.status(200).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un rol
exports.actualizarRole = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    await rol.update(req.body);
    res.status(200).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un rol
exports.eliminarRole = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    await rol.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
