## CURSOS BOOTCAMP

En la carpeta controllers posee los controladores tanto para el usuario (user.controller.js),
como para el Bootcamp (bootcamp.controller.js).

### Para el usuario, construir los siguientes controladores:

• Crear y guardar usuarios llamado createUser.

```js
exports.createUser = (user) => {
	return User.create({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
	})
		.then((user) => {
			console.log(`>> Se ha creado el user: ${JSON.stringify(user, null, 4)}`);
			return user;
		})
		.catch((err) => {
			console.log(`>> Error al crear al user ${err}`);
		});
};
```

• Obtener los Bootcamp de un usuario llamado findById.

```js
exports.findById = (userId) => {
	return User.findByPk(userId, {
		include: [
			{
				model: Bootcamp,
				as: "bootcamps",
				attributes: ["id", "title", "cue", "description"],
				through: {
					attributes: [],
				},
			},
		],
	})
		.then((users) => {
			return users;
		})
		.catch((err) => {
			console.log(`>> Error mientras se encontraba al user: ${err}`);
		});
};
```

• Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll.

```js
exports.findAll = () => {
	return User.findAll({
		include: [
			{
				model: Bootcamp,
				as: "bootcamps",
				attributes: ["id", "title", "cue", "description"],
				through: {
					attributes: [],
				},
			},
		],
	})
		.then((users) => {
			return users;
		})
		.catch((err) => {
			console.log(">> Error buscando los users: ", err);
		});
};
```

• Actualizar usuario por Id llamado updateById.

• Eliminar un usuario por Id llamado deleteById.

### Para el Bootcamp, construir los siguientes controladores:

• Crear y guardar un nuevo Bootcamp llamado createBootcamp.

```js
exports.createBootcamp = (bootcamp) => {
	return Bootcamp.create({
		title: bootcamp.title,
		cue: bootcamp.cue,
		description: bootcamp.description,
	})
		.then((bootcamp) => {
			console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`);
			return bootcamp;
		})
		.catch((err) => {
			console.log(`>> Error al crear el bootcamp: ${err}`);
		});
};
```

• Agregar un Usuario al Bootcamp llamado addUser.

```js
exports.addUser = (bootcampId, userId) => {
	return Bootcamp.findByPk(bootcampId).then((bootcamp) => {
		if (!bootcamp) {
			console.log("No se encontró el bootcamp");
			return null;
		}
		return User.findByPk(userId).then((user) => {
			if (!user) {
				console.log("Usuario no encontrado");
				return null;
			}
			bootcamp.addUser(user);
			console.log("************************************************");
			console.log(`>> Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
			console.log("************************************************");
			return bootcamp;
		});
	});
};
```

• Obtener los Bootcamp por id llamado findById.

```js
exports.findById = (bootcampId) => {
	return Bootcamp.findByPk(bootcampId, {
		include: [
			{
				model: User,
				as: "users",
				attributes: ["id", "firstName", "lastName", "email"],
				through: {
					attributes: [],
				},
			},
		],
	})
		.then((bootcamps) => {
			return bootcamps;
		})
		.catch((err) => {
			console.log(`>> Error mientras se encontraba los bootcamps: ${err}`);
		});
};
```

• Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll.

```js
exports.findAll = () => {
	return Bootcamp.findAll({
		include: [
			{
				model: User,
				as: "users",
				attributes: ["id", "firstName", "lastName", "email"],
				through: {
					attributes: [],
				},
			},
		],
	})
		.then((bootcamps) => {
			return bootcamps;
		})
		.catch((err) => {
			console.log(">> Error buscando los bootcamps: ", err);
		});
};
```

### Realizar las siguientes consultas:
Las consultas se ejecutan después de sync.run() a través de .then(() => queries()) 

• Consultando el Bootcamp por id, incluyendo los usuarios.

```js
bootcampController.findById(1).then((res) => {
	console.log("\n**********bootcampController.findById()*********");
	console.log(JSON.stringify(res, null, 2));
	console.log("************************************************");
});
```

• Listar todos los Bootcamp con sus usuarios.

```js
bootcampController.findAll().then((res) => {
	console.log("\n*********bootcampController.findAll()***********");
	console.log(JSON.stringify(res, null, 2));
	console.log("************************************************");
});
```

• Consultar un usuario por id, incluyendo los Bootcamp.

```js
userController.findById(1).then((res) => {
	console.log("\n**********userController.findById()*************");
	console.log(JSON.stringify(res, null, 2));
	console.log("************************************************");
});
```

• Listar los usuarios con sus Bootcamp.

```js
userController.findAll().then((res) => {
	console.log("\n***********userController.findAll()*************");
	console.log(JSON.stringify(res, null, 2));
	console.log("************************************************");
});
```

• Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro
Sánchez.

```js
exports.updateById = (userId, user) => {
	return User.update(
		{
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		},
		{
			where: {
				id: userId,
			},
		}
	)
		.then((users) => {
			console.log("\n*************updateById(userId, user)***********");
			if (users > 0) {
				console.log(`>> Se ha modificado el user id: ${userId} con ${JSON.stringify(user)}`);
			} else {
				console.log(`>> No existe user id: ${userId}`);
			}
			console.log("************************************************");
			return users;
		})
		.catch((err) => {
			console.log(err);
		});
};
```

• Eliminar un usuario por id; por ejemplo: el usuario con id=1.

```JS
exports.deleteById = (userId) => {
	return User.destroy({
		where: {
			id: userId,
		},
	})
		.then((users) => {
			console.log("\n***************deleteById(userId)***************");
			if (users > 0) {
				console.log(`>> Se ha eliminado el user id: ${userId}`);
			} else {
				console.log(`>> No existe user id: ${userId}`);
			}
			console.log("************************************************");
			return users;
		})
		.catch((err) => {
			console.log(err);
		});
};
```