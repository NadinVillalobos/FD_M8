// Importar los módulos necesarios
const db = require('./app/models');
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/bootcamp.controller');

// Función para crear usuarios y bootcamps
const run = async () => {
  const usersData = [
    { firstName: 'Juanito', lastName: 'Pérez', email: 'juanito@example.com' },
    { firstName: 'José', lastName: 'Gómez', email: 'jose@example.com' },
    { firstName: 'Raúl', lastName: 'Martínez', email: 'raul@example.com' },
  ];

  const bootcampsData = [
    {
      title: 'Introducción a React',
      cue: 10,
      description: 'Aprende a desarrollar interfaces con React.',
    },
    {
      title: 'Desarrollo Web Full Stack',
      cue: 12,
      description: 'Crea aplicaciones web utilizando tecnologías populares.',
    },
    {
      title: 'Big Data y AI',
      cue: 18,
      description: 'Domina Data Science, Big Data e Inteligencia Artificial.',
    },
  ];

  const createdUsers = await userController.createUsers(usersData);
  const createdBootcamps = await bootcampController.createBootcamps(bootcampsData);

  // Agregar usuarios a bootcamps
  console.log('\n************************************************');
  await bootcampController.addUser(createdBootcamps[0].id, createdUsers[0].id);
  console.log('************************************************');
  console.log('\n************************************************');
  await bootcampController.addUser(createdBootcamps[0].id, createdUsers[1].id);
  console.log('************************************************');
  console.log('\n************************************************');
  await bootcampController.addUser(createdBootcamps[1].id, createdUsers[0].id);
  console.log('************************************************');
  console.log('\n************************************************');
  await bootcampController.addUser(createdBootcamps[2].id, createdUsers[0].id);
  console.log('************************************************');
  console.log('\n************************************************');
  await bootcampController.addUser(createdBootcamps[2].id, createdUsers[1].id);
  console.log('************************************************');
  console.log('\n************************************************');
  await bootcampController.addUser(createdBootcamps[2].id, createdUsers[2].id);
  console.log('************************************************');

  // Realizar consultas
  try {
    const bootcampById = await bootcampController.findById(1);
    console.log('\n**********bootcampController.findById()*********');
    console.log(JSON.stringify(bootcampById, null, 2));
    console.log('************************************************');

    const allBootcamps = await bootcampController.findAll();
    console.log('\n*********bootcampController.findAll()***********');
    console.log(JSON.stringify(allBootcamps, null, 2));
    console.log('************************************************');

    const userById = await userController.findById(1);
    console.log('\n**********userController.findById()*************');
    console.log(JSON.stringify(userById, null, 2));
    console.log('************************************************');

    const allUsers = await userController.findAll();
    console.log('\n***********userController.findAll()*************');
    console.log(JSON.stringify(allUsers, null, 2));
    console.log('************************************************');
  } catch (error) {
    console.error('Error en las consultas:', error);
  }

  // Actualizar y eliminar usuarios
  try {
    await userController.updateById(1, {
      firstName: 'Pedro',
      lastName: 'Sánchez',
    });
    await userController.deleteById(3);
  } catch (error) {
    console.error('Error en la actualización o eliminación de usuarios:', error);
  }
};

// Sincronizar la base de datos y ejecutar la función run
db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Eliminando y resincronizando la base de datos.');
    run();
  });
