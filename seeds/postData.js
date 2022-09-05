const { Posts } = require('../models');

const postData = [
    {
        id: 1,
        title: 'Sample Post',
        content: 'Text for Sample Post',
        user_id: 1,
    },
];

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;