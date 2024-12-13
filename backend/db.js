const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("sqlite::memory:");
// const sequelize = new Sequelize('postgres://user:password@postgres:5432/mydatabase')

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
