const { Posts } = require('../models');

const postData = [
    {
        id: 1,
        title: 'Sample Post',
        content: 'Text for Sample Post',
        upload_date: 'September 04, 2022 07:00:00',
        user_id: 1,
    },
];

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;