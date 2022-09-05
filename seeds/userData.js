const { User } = require('../models');

const userData = [
    {
        username: 'sampleUser123',
        password: 'password123',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;