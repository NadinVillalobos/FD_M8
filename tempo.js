const faker = require('faker');
const { User, Bootcamp } = require('./app/models');
const { Op } = require('sequelize');

// Generar datos falsos para usuarios
const generateFakeUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }
  return users;
};

// Generar datos falsos para bootcamps
const generateFakeBootcamps = (count) => {
  const bootcamps = [];
  for (let i = 0; i < count; i++) {
    bootcamps.push({
      title: faker.lorem.word(),
      cue: faker.random.number({ min: 5, max: 10 }),
      description: faker.lorem.sentence(),
    });
  }
  return bootcamps;
};

// Crear usuarios y bootcamps falsos
const createFakeData = async () => {
  try {
    const fakeUsers = generateFakeUsers(6);
    const fakeBootcamps = generateFakeBootcamps(6);

    const createdUsers = await User.bulkCreate(fakeUsers, { validate: true });
    const createdBootcamps = await Bootcamp.bulkCreate(fakeBootcamps, { validate: true });

    console.log('Usuarios y Bootcamps creados con datos falsos.');
  } catch (error) {
    console.error('Error al crear datos falsos:', error);
  }
};

// Cargar datos falsos en la base de datos
createFakeData();
