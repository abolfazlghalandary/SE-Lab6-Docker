const User = require('./User');

async function createUser(name, email, age) {
    const user = await User.create({ name, email, age });
    return user;
}

async function getUserById(id) {
    const user = await User.findByPk(id);
    return user;
}

async function updateUser(id, name, email, age) {
    const user = await User.findByPk(id);
    if (user) {
        user.name = name;
        user.email = email;
        user.age = age;
        await user.save();
        return user;
    }
    return null;
}

async function deleteUser(id) {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return user;
    }
    return null;
}

module.exports = { createUser, getUserById, updateUser, deleteUser };