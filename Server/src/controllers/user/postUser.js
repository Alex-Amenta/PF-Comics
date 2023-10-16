const { User } = require('../../db');

const postUser = async (name, email, password, image) => {
    const user = await User.create({ name, email, password, image });

    if (!name || !email || !password) throw new Error('No se pudo crear el usuario');

    return user;
}

module.exports = postUser