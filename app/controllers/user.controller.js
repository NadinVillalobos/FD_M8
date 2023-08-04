const { users } = require('../models');
const db = require('../models');
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createUsers = async (usersData) => {
  const createdUsers = [];

  for (const userData of usersData) {
    try {
      const user = await User.create(userData);
      console.log(`Usuario creado: ${JSON.stringify(user, null, 4)}`);
      createdUsers.push(user);
    } catch (error) {
      console.log(`Error al crear el Usuario: ${error}`);
    }
  }

  return createdUsers;
};

exports.findById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Bootcamp, as: 'bootcamps', attributes: ['id', 'title', 'cue', 'description'], through: { attributes: [] } }],
    });
    return user;
  } catch (error) {
    console.log('Error al buscar el Usuario por ID:', error);
    return null;
  }
};

exports.findAll = async () => {
  try {
    const users = await User.findAll({
      include: [{ model: Bootcamp, as: 'bootcamps', attributes: ['id', 'title', 'cue', 'description'], through: { attributes: [] } }],
    });
    return users;
  } catch (error) {
    console.log('Error al buscar todos los Usuarios:', error);
    return [];
  }
};

exports.updateById = async (userId, userData) => {
  try {
    const [updatedCount, updatedUsers] = await User.update(userData, {
      where: { id: userId },
    });
    
    if (updatedCount > 0) {
      console.log(`Usuario con ID ${userId} actualizado con éxito.`);
    } else {
      console.log(`No se encontró el Usuario con ID ${userId}.`);
    }

    return updatedUsers;
  } catch (error) {
    console.log('Error al actualizar el Usuario:', error);
    return null;
  }
};

exports.deleteById = async (userId) => {
  try {
    const deletedCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedCount > 0) {
      console.log(`Usuario con ID ${userId} eliminado con éxito.`);
    } else {
      console.log(`No se encontró el Usuario con ID ${userId}.`);
    }
  } catch (error) {
    console.log('Error al eliminar el Usuario:', error);
  }
};
