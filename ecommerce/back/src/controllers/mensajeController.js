import Mensaje from '../models/Mensaje.js';

// Obtener todos los mensajes
export const getMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.findAll();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

// Obtener mensaje por ID
export const getMensajeById = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await Mensaje.findByPk(id);

    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
};

// Crear mensaje
export const createMensaje = async (req, res) => {
    const { id } = req.params;         
    const { texto } = req.body;
  
    try {
      const nuevoMensaje = await Mensaje.create({
        texto,
        idProducto: id                
      });
      res.status(201).json(nuevoMensaje);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el mensaje' });
    }
  };
  

// Obtener mensajes por idProducto
export const getMensajesByProducto = async (req, res) => {
    const { id } = req.params;
    try {
      const mensajes = await Mensaje.findAll({
        where: { idProducto: id  }
      });
      res.json(mensajes);
    } catch (error) {
      console.error('Error en getMensajesByProducto:', error);
      res.status(500).json({ error: 'Error al obtener los mensajes del producto' });
    }
  };
  


// Actualizar mensaje
export const updateMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto } = req.body;
    const mensaje = await Mensaje.findByPk(id);

    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    mensaje.texto = texto;
    await mensaje.save();

    res.json(mensaje);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el mensaje' });
  }
};

// Eliminar mensaje
export const deleteMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await Mensaje.findByPk(id);

    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    await mensaje.destroy();
    res.json({ mensaje: 'Mensaje eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
};
