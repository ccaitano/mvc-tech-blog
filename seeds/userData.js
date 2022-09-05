const { User } = require('../models');

const userData = [
    {
        id: 1,
        username: 'sampleUser123',
        password: 'password123',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;