const { users, bootcamps } = require('../models');
const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

exports.createBootcamps = async (bootcampsData) => {
  const createdBootcamps = [];

  for (const bootcampData of bootcampsData) {
    try {
      const bootcamp = await Bootcamp.create(bootcampData);
      console.log(`Bootcamp creado: ${JSON.stringify(bootcamp, null, 4)}`);
      createdBootcamps.push(bootcamp);
    } catch (error) {
      console.log(`Error al crear el Bootcamp: ${error}`);
    }
  }

  return createdBootcamps;
};

exports.addUser = async (bootcampId, userId) => {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      console.log('Bootcamp no encontrado.');
      return null;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      console.log('Usuario no encontrado.');
      return null;
    }

    await bootcamp.addUser(user);
    console.log(`Usuario con ID ${user.id} agregado al Bootcamp con ID ${bootcamp.id}`);
    return bootcamp;
  } catch (error) {
    console.log('Error al agregar usuario al Bootcamp:', error);
    return null;
  }
};

exports.findById = async (bootcampId) => {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId, {
      include: [{ model: User, as: 'users', attributes: ['id', 'firstName', 'lastName', 'email'], through: { attributes: [] } }],
    });
    return bootcamp;
  } catch (error) {
    console.log('Error al buscar el Bootcamp por ID:', error);
    return null;
  }
};

exports.findAll = async () => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{ model: User, as: 'users', attributes: ['id', 'firstName', 'lastName', 'email'], through: { attributes: [] } }],
    });
    return bootcamps;
  } catch (error) {
    console.log('Error al buscar todos los Bootcamps:', error);
    return [];
  }
};
