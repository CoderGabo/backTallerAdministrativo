const Code = require('../models/Code');
const Usuario = require('../models/Usuario');

exports.createCode = async (req, res) => {
    try {
        const { html_route, user_id } = req.body;

        const user = await Usuario.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crear el código en la base de datos
        const code = await Code.create({ html_route, user_id });

        return res.status(201).json({ message: 'Código guardado correctamente', code });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al guardar el código', error });
    }
};

exports.getCodeByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Buscar los códigos del usuario
        const codes = await Code.findAll({
            where: { user_id },
            include: [{ model: Usuario, attributes: ['id', 'supername', 'email'] }],
        });

        return res.status(200).json({ codes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los códigos', error });
    }
};

exports.updateOrCreateCode = async (req, res) => {
    try {
        const { html_route, user_id, design_name } = req.body;

        const user = await Usuario.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const existingCode = await Code.findOne({ 
            where: { user_id, design_name } 
        });

        if (existingCode) {
            // existingCode.html_route = html_route;
            // existingCode.design_name = design_name;
            try {
                await existingCode.update(req.body);
                return res.status(200).json({ message: 'Código actualizado correctamente', code: existingCode });
            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error al actualizar el código', error });
            }
        }

        const newCode = await Code.create({ html_route, user_id, design_name });
        return res.status(201).json({ message: 'Código creado correctamente', code: newCode });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al guardar o actualizar el código', error });
    }
};
