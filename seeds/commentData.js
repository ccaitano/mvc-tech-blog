const { Comments } = require('../models');

const commentData = [
    {
        id: 1,
        comment: 'Comment for Sample Post',
        user_id: 1,
        post_id: 1,
    },
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;