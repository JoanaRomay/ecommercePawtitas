    import Cliente from '../models/Cliente.js';
    import jwt from "jsonwebtoken";
    import { OAuth2Client } from 'google-auth-library';

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


    // Obtener todos los clientes
    export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes.' });
    }
    };

    // Obtener un cliente por ID
    export const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado.' });

        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente.' });
    }
    };

    // Crear nuevo cliente
    export const createCliente = async (req, res) => {
    const { nombre, email, contraseña } = req.body;
    try {
        // Validar email único
        const existente = await Cliente.findOne({ where: { email } });
        if (existente) return res.status(400).json({ error: 'El email ya está registrado.' });

        const nuevoCliente = await Cliente.create({ nombre, email, contraseña });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente.' });
    }
    };

    // Actualizar un cliente
export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    email,
    contraseña,
    telefono,
    direccion,
    ciudad,
    provincia,
    codigoPostal,
    fechaNacimiento,
    genero
  } = req.body;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado.' });

    // Validar si se quiere cambiar el email y que no esté repetido
    if (email && email !== cliente.email) {
      const existente = await Cliente.findOne({ where: { email } });
      if (existente) return res.status(400).json({ error: 'Ese email ya está en uso.' });
    }

    // Actualizar todos los campos
    await cliente.update({
      nombre: nombre ?? cliente.nombre,
      email: email ?? cliente.email,
      contraseña: contraseña ?? cliente.contraseña,
      telefono: telefono ?? cliente.telefono,
      direccion: direccion ?? cliente.direccion,
      ciudad: ciudad ?? cliente.ciudad,
      provincia: provincia ?? cliente.provincia,
      codigoPostal: codigoPostal ?? cliente.codigoPostal,
      fechaNacimiento: fechaNacimiento ?? cliente.fechaNacimiento,
      genero: genero ?? cliente.genero,
    });

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente.' });
  }
};



    // Eliminar un cliente
    export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado.' });

        await cliente.destroy();
        res.json({ mensaje: 'Cliente eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente.' });
    }
};
    
    export const loginConGoogle = async (req, res) => {
    try {
        const { token } = req.body;

        // Verificar token con Google
        const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name: nombre, picture: foto } = payload;

        // Buscar o crear cliente
        let cliente = await Cliente.findOne({ where: { email } });

        if (!cliente) {
        cliente = await Cliente.create({ nombre, email, googleId, foto, proveedor: 'google' });
        } else if (!cliente.googleId) {
        await cliente.update({ googleId, proveedor: 'google', foto });
        }

        // Generar JWT
        const jwtToken = jwt.sign({ id: cliente.id, email: cliente.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ ok: true, mensaje: 'Inicio de sesión con Google exitoso', cliente, token: jwtToken });
    } catch (error) {
    console.error('ERROR LOGIN GOOGLE:', error);
    res.status(500).json({ error: error.message });
    }

    };

