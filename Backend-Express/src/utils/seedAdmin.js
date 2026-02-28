const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@tienda.com' });

    if (adminExists) {
      console.log('🔐 Admin ya existe');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      name: 'Administrador',
      email: 'admin@tienda.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin creado correctamente');
  } catch (error) {
    console.error('❌ Error creando admin:', error);
  }
};

module.exports = createAdmin;